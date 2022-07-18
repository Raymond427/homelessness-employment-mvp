import firebase from "../firebase";
import { capitalize } from ".";
import { performanceMonitor, analytics } from "../firebase";

const MARGIN = 0.1;

const stripeProcessingFee = amount => Math.ceil(amount * 0.029 + 30);

const calculateServiceFee = amount => amount * MARGIN;

export const calculateProcessingFee = amount =>
  stripeProcessingFee(amount + calculateServiceFee(amount)) +
  calculateServiceFee(amount);

export const paymentIntentArgsFactory = (
  donee,
  totalCost,
  source,
  user,
  donationAmount,
  donationMessage,
  processingFee,
  nameOnCard,
  anonymousDonation
) => ({
  amount: totalCost,
  currency: "usd",
  description: `Donation to ${capitalize(donee.firstName)} ${capitalize(
    donee.lastName
  )}`,
  metadata: {
    campaign_name: `${capitalize(donee.firstName)} ${capitalize(
      donee.lastName
    )}`,
    donation_amount: donationAmount,
    service_fee: calculateServiceFee(donationAmount),
    processing_fee: processingFee,
    firebase_uid: user.uid,
    guest_user: user.isAnonymous,
    donationMessage,
    campaign_id: donee.id,
    anonymous_donation: anonymousDonation,
    photoURL: user.photoURL,
    name_on_card: nameOnCard
  },
  payment_method: source,
  payment_method_types: ["card"],
  receipt_email: user.email
});

export const chargeCard = async (
  confirmCardPayment,
  source,
  {
    donee,
    anonymousDonation,
    donationAmount,
    donationMessage,
    user,
    totalCost,
    processingFee,
    method
  },
  nameOnCard
) => {
  const chargeTrace = performanceMonitor.trace("charge");
  chargeTrace.start();
  chargeTrace.putAttribute("method", method);

  try {
    const paymentIntentArgs = paymentIntentArgsFactory(
      donee,
      totalCost,
      source,
      user,
      donationAmount,
      donationMessage,
      processingFee,
      nameOnCard,
      anonymousDonation
    );
    const createPaymentIntent = firebase
      .functions()
      .httpsCallable("createPaymentIntent");

    const { data: paymentIntent } = await createPaymentIntent(
      paymentIntentArgs
    );

    analytics.logEvent("purchase", {
      currency: paymentIntent.currency,
      items: [
        {
          id: donee.id,
          name: `${capitalize(donee.firstName)} ${capitalize(donee.lastName)}`,
          quantity: 1,
          price: donationAmount / 100
        }
      ],
      transaction_id: paymentIntent.id,
      tax: processingFee / 100,
      value: donationAmount / 100
    });

    chargeTrace.putAttribute("result", "success");
    chargeTrace.putAttribute("status", paymentIntent.status);

    const confirmCardPaymentResult = await confirmCardPayment(
      paymentIntent.client_secret,
      {
        payment_method: source,
        receipt_email: user.email
      }
    );

    chargeTrace.stop();

    return confirmCardPaymentResult;
  } catch (error) {
    chargeTrace.putAttribute("result", "fail");
    chargeTrace.stop();
    return error;
  }
};

export const isPaymentError = error =>
  error instanceof Error ||
  (error.stack && error.message) ||
  error.error ||
  (typeof error.status === "string" && error.status.includes("Error"));

export const handlePaymentError = (setPaymentResult, error) => {
  const genericErrorMessage =
    "We're having some trouble connecting to the internet, check that your connection is good then try again";

  if (error.error) {
    setPaymentResult(error.error.message || genericErrorMessage);
  } else if (error.raw) {
    setPaymentResult(error.raw.message || genericErrorMessage);
  } else if (error.type === "card_error") {
    setPaymentResult(error.message);
  } else {
    setPaymentResult(genericErrorMessage);
  }
};

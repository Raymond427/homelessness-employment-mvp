const functions = require('firebase-functions')
const admin = require('firebase-admin')
const Stripe = require('stripe')

admin.initializeApp()
const db = admin.firestore()

const stripe = new Stripe(functions.config().stripe.secret)

exports.createStripeCustomer = functions.auth.user().onCreate(
    async ({ uid, email, displayName, metadata: { creationTime } }) => {
        const firebaseuid = uid
        const customer = email ? await stripe.customers.create({ email, name: displayName, metadata: { firebaseuid } }) : { id: null }

        return db.doc(`users/${firebaseuid}`).create({ email, creationTime, stripeid: customer.id })
    }
)

exports.createPaymentIntent = functions.https.onCall(
    async (paymentIntentArgs, context) => {
        const firebaseuid = context.auth.uid
        const user = await db.doc(`users/${firebaseuid}`).get()
        const userStripeCustomerId = user.data() ? user.data().stripeid : null
        
        try {
            return await stripe.paymentIntents.create(user && user.email && userStripeCustomerId ? { ...paymentIntentArgs, customer: userStripeCustomerId } : paymentIntentArgs)
        } catch (error) {
            return error
        }
    }
)

exports.onPaymentSuccessful = functions.https.onRequest(
    async (request, response) => {
        const requestSignature = request.headers['stripe-signature']
        const signingKey = functions.config().stripe.signing_key

        try {
            stripe.webhooks.constructEvent(request.rawBody, requestSignature, signingKey)
        } catch (err) {
            return response.status(400).end()
        }
        
        const donationObject = request.body.data.object
        const { id, amount, created, currency, metadata } = donationObject
        const donation = {
            stripeId: id,
            ...metadata,
            donation_amount: Number(metadata.donation_amount),
            processing_fee: Number(metadata.processing_fee),
            totalAmount: amount,
            created: Number(created),
            currency
        }

        db.collection('/donations').add(donation)
        const campaignRef = db.collection(`/campaign`).doc(metadata.campaign_id)
        const campaignData = (await campaignRef.get()).data()
        campaignRef.update({
            amountDonated: campaignData.amountDonated + Number(metadata.donation_amount),
            donationCount: campaignData.donationCount + 1,
        })

        return response.status(200).end()
    }
)
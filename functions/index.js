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
            const paymentIntent = await stripe.paymentIntents.create(user && user.email && userStripeCustomerId ? { ...paymentIntentArgs, customer: userStripeCustomerId } : paymentIntentArgs)
            if (paymentIntent.status === 'succeeded') {
                db.collection('/donations').add({ ...data.donationPayload, stripeChargeId: chargeResponse.id })
            }

            return paymentIntent
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
            const event = stripe.webhooks.constructEvent(request.rawBody, requestSignature, signingKey)
        } catch (err) {
            return response.status(400).end()
        }
        
        const donationObject = request.body.data.object
        const { id, amount, created, currency, metadata } = donationObject
        const donation = {
            stripeId: id,
            ...metadata,
            totalAmount: amount,
            created: Number(created),
            currency
        }

        db.collection('/donations').add(donation)

        return response.status(200).end()
    }
)
const functions = require('firebase-functions')
const admin = require('firebase-admin')
const Stripe = require('stripe')

admin.initializeApp()
const db = admin.firestore()

const stripe = new Stripe(functions.config().stripe.secret)

exports.createStripeCustomer = functions.auth.user().onCreate(
    async ({ uid, email, displayName, metadata: { creationTime } }, context) => {

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

exports.processPayment = functions.https.onCall(
    async (data, context) => {
        try {
            const chargeResponse = await stripe.charges.create({ metadata: { firebaseuid }, ...data.chargePayload })
        
            if (chargeResponse.status === 'succeeded') {
                db.collection(`donations`).add({ ...data.donationPayload, stripeChargeId: chargeResponse.id })
            }

            return chargeResponse
        } catch (error) {
            return error
        }
    }
)
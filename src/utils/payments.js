import { capitalize } from '.'
import { postOrder, performanceMonitor, analytics } from '../firebase'
import { formatPaymentErrorMessage } from './errorMessages'

const FIREBASE_CHARGE_CARD_FUNCTION_URL = ''

const postOrderPayload = (user, product, processingFee, totalCost, chargeId) => ({
    datePurchased: new Date().getTime(),
    userId: user.uid,
    productName: product.name,
    stripeChargeId: chargeId,
    charges: {
        product: product.price,
        processing: processingFee
    },
    totalCost
})

export const chargeWithToken = (token, product, user, totalCost, processingFee, setPaymentSuccessful, setPaymentResult, method) => {
    const chargeTrace = performanceMonitor.trace('charge')
    chargeTrace.start()
    chargeTrace.putAttribute('method', method)
    fetch(FIREBASE_CHARGE_CARD_FUNCTION_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: chargePayload(user, product, totalCost, processingFee, token)
    })
        .then(response => response.json().then(response => {
                chargeTrace.putAttribute('result', 'other')
                chargeTrace.putAttribute('status', 'response.status')
                if (response.status === 'succeeded') {
                    chargeTrace.putAttribute('result', 'success')
                    postOrder(postOrderPayload(user, product, processingFee, totalCost, response.id))
                    analytics.logEvent('purchase', {
                        currency: response.currency,
                        items: [ product.name ],
                        transaction_id: response.id,
                        tax: processingFee,
                        value: product.price
                    })
                    setPaymentSuccessful(true)
                    return { successful: true }
                } else {
                    throw (response)
                }
            })
        )
        .catch(error => {
            chargeTrace.putAttribute('result', 'fail')
            setPaymentResult(formatPaymentErrorMessage(error))
            return { successful: false }
        })
        .finally(() => chargeTrace.stop())
}

export const chargePayload = (user, product, totalCost, processingFee, token) => JSON.stringify({
    amount: totalCost,
    currency: 'usd',
    description: `Work After Work Profit Guide: ${capitalize(product.name)}`,
    receipt_email: user.email,
    metadata: {
        price: product.price,
        processing_fee: processingFee
    },
    source: token.id
})

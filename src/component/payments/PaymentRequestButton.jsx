import React, { useState, useEffect } from 'react'
import { PaymentRequestButtonElement } from '@stripe/react-stripe-js'
import { capitalize } from '../../utils'
import { paymentIntentArgsFactory, handlePaymentError } from '../../utils/payments'
import firebase, { performanceMonitor, analytics } from '../../firebase'

const PaymentRequestButton = ({ stripe, user, donee, totalCost, donationAmount, donationMessage, processingFee, setIsLoading, setPaymentResult, setPaymentSuccessful, ...chargePayload }) => {
    const [ canMakePayment, setCanMakePayment ] = useState(false)
    const [ paymentRequest, setPaymentRequest ] = useState(null)

    const paymentRequestArgs = {
        currency: 'usd',
        displayItems: [
            {
                label: `${capitalize(donee.firstName)} ${capitalize(donee.lastName)}`,
                amount: Math.round((isNaN(donationAmount) || !donationAmount) ? 0 : donationAmount)
            },
            {
                label: `Processing`,
                amount: Math.round(processingFee || 0)
            }
        ],
        total: {
            label: `Donation to ${capitalize(donee.firstName)} ${capitalize(donee.lastName)}`,
            amount: Math.round(totalCost)
        },
        requestPayerName: true,
        requestPayerEmail: true
    }

    const paymentRequestUpdateArgs = { displayItems: paymentRequestArgs.displayItems, total: paymentRequestArgs.total }

    useEffect(() => {
        if (stripe) {
            const paymentRequest = stripe.paymentRequest({ country: 'US', requestPayerName: true, requestPayerEmail: true, ...paymentRequestArgs })

            const canMakePaymentTrace = performanceMonitor.trace()
            canMakePaymentTrace.start()
    
            const checkPaymentRequestButtonAvailable = async () => {
                const paymentRequestButtonAvailable = await paymentRequest.canMakePayment()
                analytics.logEvent('payment_request_button_available', { available: `${paymentRequestButtonAvailable}` })
    
                if (paymentRequestButtonAvailable) {
                    canMakePaymentTrace.putAttribute('result', 'success')
                    setCanMakePayment(paymentRequestButtonAvailable)
                }
    
                canMakePaymentTrace.stop()
            }
    
            checkPaymentRequestButtonAvailable()
    
            setPaymentRequest(paymentRequest)
        }
    }, [ stripe ])

    useEffect(() => {
        if (paymentRequest) {
            paymentRequest.update(paymentRequestUpdateArgs)
        }

        if (paymentRequest) {
            paymentRequest.on('paymentmethod', async event => {
                analytics.logEvent('set_checkout_option', {
                    checkout_option: 'payment_request_button'
                })

                if (donationAmount === 0) {
                    setPaymentResult('Please enter an amount greater than zero')
                    return
                }

                setIsLoading(true)

                try {
                    const createPaymentIntent = firebase.functions().httpsCallable('createPaymentIntent')
                    const paymentIntentArgs = paymentIntentArgsFactory(donee, totalCost, event.paymentMethod.id, { ...user, email: event.payerEmail }, donationAmount, donationMessage, processingFee)
                    const { data: paymentIntent } = await createPaymentIntent(paymentIntentArgs)
    
                    if (paymentIntent.type === 'StripeInvalidRequestError') {
                        event.complete('fail')
                        throw paymentIntent
                    }
    
                    const cardPaymentResult = await stripe.confirmCardPayment(
                        paymentIntent.client_secret,
                        { payment_method: event.paymentMethod.id },
                        { handleActions: false }
                    )
    
                    if (cardPaymentResult.error) {
                        handlePaymentError(setPaymentResult, cardPaymentResult.error)
                        event.complete('fail')
                    } else {
                        analytics.logEvent('purchase', {
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
                        })

                        event.complete('success')
                        setPaymentSuccessful(true)
                    }
                } catch (error) {
                    handlePaymentError(setPaymentResult, error)
                }
                setIsLoading(false)
            })
        }

        return () => paymentRequest && paymentRequest.removeAllListeners()

    }, [ donationAmount ])

    return (
            (canMakePayment && paymentRequest) ? (
                <>
                    <PaymentRequestButtonElement
                        options={{paymentRequest}}
                        className="PaymentRequestButton"
                        style={{ paymentRequestButton: { theme: 'dark' },}}
                    />
                    <p className="payment-request-button-divisor">OR</p>
                </>
            ) : null
    )
}

export default PaymentRequestButton
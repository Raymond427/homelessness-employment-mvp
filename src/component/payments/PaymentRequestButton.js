import React, { useState, useEffect } from 'react'
import { PaymentRequestButtonElement } from '@stripe/react-stripe-js'
import { ThemeContext } from '../provider/ThemeProvider'
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
    
                if (paymentRequestButtonAvailable) {
                    canMakePaymentTrace.putAttribute('result', 'success')
                    analytics.logEvent('payment_request_button_available', { available: `${paymentRequestButtonAvailable}` })
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
                if (donationAmount === 0) {
                    setPaymentResult('Please enter an amount greater than zero')
                    return
                }

                setIsLoading(true)

                try {
                    const createPaymentIntent = firebase.functions().httpsCallable('createPaymentIntent')
                    const paymentIntentArgs = paymentIntentArgsFactory(donee, totalCost, event.paymentMethod.id, user, donationAmount, donationMessage, processingFee)
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
                        event.complete('success')
                        setPaymentSuccessful(true)
                    }
                } catch (error) {
                    handlePaymentError(setPaymentResult, error)
                }
                setIsLoading(false)
            })
        }

        return () => {
            if (paymentRequest) {
                paymentRequest && paymentRequest.removeAllListeners()
            }
        }

    }, [ donationAmount ])

    return (
        <ThemeContext.Consumer>
            {({ theme }) => (canMakePayment && paymentRequest) ? (
                    <>
                        <PaymentRequestButtonElement
                            options={{paymentRequest}}
                            className="PaymentRequestButton"
                            style={{ paymentRequestButton: { theme },}}
                        />
                        <p className="payment-request-button-divisor">OR</p>
                    </>
                ) : null
            }
        </ThemeContext.Consumer>
    )
}

export default PaymentRequestButton
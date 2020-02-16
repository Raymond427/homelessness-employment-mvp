import React, { useState, useEffect } from 'react'
import { PaymentRequestButtonElement } from 'react-stripe-elements'
import { ThemeContext } from '../provider/ThemeProvider'
import { chargeWithToken } from '../../utils/payments'
import { capitalize } from '../../utils'
import { performanceMonitor, MAX_ATTRIBUTE_VALUE_LENGTH, analytics } from '../../firebase'
import { formatPaymentErrorMessage } from '../../utils/errorMessages'

const PaymentRequestButton = ({ stripe, user, product, processingFee, totalCost, setPaymentSuccessful, setPaymentResult }) => {
    const [ canMakePayment, setCanMakePayment ] = useState(false)
    const [ paymentRequest, setPaymentRequest ] = useState(null)

    useEffect(() => {
        const paymentRequest = stripe.paymentRequest({
            currency: 'usd',
            country: 'US',
            total: {
                label: `Work After Work Profit Guide: ${capitalize(product.name)}`,
                amount: totalCost,
            },
            requestPayerName: true,
            requestPayerEmail: true,
        })

        const canMakePaymentTrace = performanceMonitor.trace()
        canMakePaymentTrace.start()
        paymentRequest.canMakePayment()
            .then(result => {
                canMakePaymentTrace.putAttribute('result', 'success')
                analytics.logEvent('payment_request_button_available', { available: `${result}` })
                setCanMakePayment(result)
            })
            .catch(error => {
                canMakePaymentTrace.putAttribute('result', 'fail')
                const errorMessage = formatPaymentErrorMessage(error)
                canMakePaymentTrace.putAttribute('errorMessage', errorMessage.slice(0, MAX_ATTRIBUTE_VALUE_LENGTH))
            }).finally(() => canMakePaymentTrace.stop())

        paymentRequest.on('token', ({ token, complete }) => {
            analytics.logEvent('set_checkout_option', {
                checkout_option: 'payment_request_button'
            })
            chargeWithToken(token, product, user, totalCost, processingFee, setPaymentSuccessful, setPaymentResult, 'paymentRequest')
                .then(({ successful }) => successful ? complete('success') : complete('fail'))
        })

        setPaymentRequest(paymentRequest)
    }, [])

    return (
        <ThemeContext.Consumer>
            {({ theme }) => (canMakePayment && paymentRequest) ? (
                    <>
                        <PaymentRequestButtonElement
                            paymentRequest={paymentRequest}
                            className="PaymentRequestButton"
                            style={{
                                paymentRequestButton: { theme },
                            }}
                        />
                        <p className="payment-request-button-divisor">OR</p>
                    </>
                ) : null
            }
        </ThemeContext.Consumer>
    )
}

export default PaymentRequestButton
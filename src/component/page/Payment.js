import React, { useState, useEffect } from 'react'
import { injectStripe, Elements, StripeProvider } from 'react-stripe-elements'
import '../../styles/Payment.css'
import PaymentRequestButton from '../payments/PaymentRequestButton'
import CardForm from '../payments/CardForm'
import Page from '.'

const STRIPE_API_KEY = 'pk_test_4rWg2XM8fvy3qPsCAl0sgHOW00EPrJ0oWu'

const CheckoutForm = injectStripe(CardForm)
const PaymentButton = injectStripe(PaymentRequestButton)

const Payment = ({ user, donee, computedMatch }) => {
    const [ stripe, setStripe ] = useState(null)
    
    useEffect(() => {
        window.Stripe
            ? setStripe(window.Stripe(STRIPE_API_KEY))
            : document.getElementById('stripe-js').addEventListener('load', () => setStripe(window.Stripe(STRIPE_API_KEY)))
    }, [ window.Stripe ])

    return (
        <Page pageClassName="Payment">
            <StripeProvider stripe={stripe} apiKey={STRIPE_API_KEY}>
                <Elements>
                    <CheckoutForm user={user} donee={donee} PaymentButton={PaymentButton} />
                </Elements>
            </StripeProvider>
        </Page>
    )
}

export default Payment
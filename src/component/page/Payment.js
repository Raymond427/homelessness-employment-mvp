import React from 'react'
import { Elements, PaymentRequestButtonElement } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import '../../styles/Payment.css'
import CardForm from '../payments/CardForm'
import Page from '.'

const STRIPE_API_KEY = 'pk_test_4rWg2XM8fvy3qPsCAl0sgHOW00EPrJ0oWu'

const Payment = ({ user, donee }) => {
    const stripePromise = loadStripe(STRIPE_API_KEY)

    return (
        <Page pageClassName="Payment">
            <Elements stripe={stripePromise}>
                <CardForm user={user} donee={donee} PaymentButton={PaymentRequestButtonElement} />
            </Elements>
        </Page>
    )
}

export default Payment
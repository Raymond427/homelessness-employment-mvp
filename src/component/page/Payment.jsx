import React, { useContext } from 'react'
import { Elements, PaymentRequestButtonElement } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import '../../styles/Payment.css'
import CardForm from '../payments/CardForm'
import Page from '.'
import { CampaignContext } from '../provider/CampaignProvider'
import Loading from '../icon/Loading'

const STRIPE_API_KEY = 'pk_test_4rWg2XM8fvy3qPsCAl0sgHOW00EPrJ0oWu'

const Payment = ({ user }) => {
    const stripePromise = loadStripe(STRIPE_API_KEY)
    const { campaigns } = useContext(CampaignContext)
    const campaign = campaigns[0]

    return (
        <Page pageClassName="Payment">
            {campaign ? (
                <Elements stripe={stripePromise}>
                    <CardForm user={user} donee={campaign} PaymentButton={PaymentRequestButtonElement} />
                </Elements>
            ) : (<Loading />)}       
        </Page>
    )
}

export default Payment
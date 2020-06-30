import React, { useState, useEffect } from 'react'
import Order from '../Order'
import Form from '../form'
import { capitalize, totalPrice, usdFormat, usdFormatToCents } from '../../utils'
import { PATHS } from '../../utils/constants'
import { chargeCard, handlePaymentError, isPaymentError, calculateProcessingFee } from '../../utils/payments'
import { TextField, USDField, RadioField, EmailField } from '../form/input'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { performanceMonitor } from '../../firebase'
import { analytics } from '../../firebase'
import { NarrowCard } from '../Card'
import { FeedBackForm } from '../page/Feedback'
import { Donation } from '../DonationFeed'
import ShareButton, { shareData } from '../ShareButton'
import PaymentRequestButton from './PaymentRequestButton'

const CardForm = ({ user, donee }) => {
    const stripe = useStripe()
    const elements = useElements()

    const [ paymentSuccessful, setPaymentSuccessful] = useState(false)
    const [ paymentResult, setPaymentResult ] = useState('')
    const [ isLoading, setIsLoading ] = useState(false)
    const [ name, setName ] = useState('')
    const [ email, setEmail ] = useState(user.isAnonymous ? '' : user.email)
    const [ streetAddress, setStreetAddress ] = useState('')
    const [ streetAddress2, setStreetAddress2 ] = useState('')
    const [ zipCode, setZipCode ] = useState('')
    const [ city, setCity ] = useState('')
    const [ state, setState ] = useState('')
    const [ donationAmount, setDonationAmount ] = useState(0)
    const [ donationMessage, setDonationMessage ] = useState('')
    const [ showCustomInput, setShowCustomInput ] = useState(false)

    useEffect(() => {
        if (!stripe) {
            analytics.logEvent('begin_checkout', {
                currency: 'usd',
                items: [ donee.name ],
                value: donationAmount
            })
        }
    }, [ stripe ])

    if (!stripe || !elements) { return null }

    const capitalizedDoneeName = `${capitalize(donee.firstName)} ${capitalize(donee.lastName)}`
    const processingFee = !donationAmount || donationAmount === 0 || isNaN(donationAmount) ? 0 : calculateProcessingFee(donationAmount)
    const charges = [
        { name: capitalizedDoneeName, price: isNaN(donationAmount) ? 0 : donationAmount },
        { name: 'Processing', price: processingFee }
    ]
    const totalCost = Math.round(totalPrice(charges))

    const billingDetails = {
        billing_details: {
            address: {
                city,
                country: 'US',
                line1: streetAddress,
                line2: streetAddress2,
                postal_code: zipCode,
                state: state
            },
            name
        }
    }

    const chargePayload = {
        donee,
        donationAmount,
        donationMessage,
        user: { ...user, email },
        totalCost,
        processingFee,
        setPaymentSuccessful,
        setIsLoading,
        setPaymentResult,
        method: 'card'
    }

    const processPayment = async () => {
        if (!donationAmount || donationAmount === 0) {
            setPaymentResult('Please enter an amount greater than zero')
            return
        }

        analytics.logEvent('set_checkout_option', {
            checkout_option: 'card_form'
        })

        setIsLoading(true)
        
        const paymentMethodCreationTrace = performanceMonitor.trace('paymentMethodCreation')
        paymentMethodCreationTrace.start()

        try {
            const cardElement = elements.getElement(CardElement)

            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                ...billingDetails,
                card: cardElement
            })

            if (error) {
                paymentMethodCreationTrace.putAttribute('result', 'fail')
                paymentMethodCreationTrace.stop()

                handlePaymentError(setPaymentResult, error)
            } else {
                paymentMethodCreationTrace.putAttribute('result', 'success')
                paymentMethodCreationTrace.stop()

                const chargeResult = await chargeCard(stripe.confirmCardPayment, paymentMethod.id, chargePayload)
                
                if (isPaymentError(chargeResult)) {
                    handlePaymentError(setPaymentResult, chargeResult)
                } else {
                    setPaymentSuccessful(true)
                }
            }
        } catch(error) {
            handlePaymentError(setPaymentResult, error)
        }

        setIsLoading(false)
    }

    const onQuickSelectClick = value => {
        setShowCustomInput(value === 'Custom Amount')
        setDonationAmount(value)
    }

    return (
            <>
                {paymentSuccessful
                    ?   <NarrowCard title="Thank You for your Donation!">
                            <h3>Here's a message from {donee.firstName}</h3>
                            <img className="completed-donation-img" src={require(`../../img/employment-headshot-mvp.jpg`)} alt={`${donee.firstName} ${donee.lastName}`} />
                            <p>{donee.thankYouMessage}</p>
                            <ShareButton theme={'icon'} shareData={shareData(`${PATHS.PROFILE}/${donee.id}`)} />
                            <h4>{email && email.length > 0 ? `We’ve sent a reciept to ${email}` : "We’ve sent a reciept to your email address"}</h4>
                            <Order productName={capitalizedDoneeName} charges={charges} />
                            <h4>Here's how your donation will appear on {donee.firstName}'s campaign</h4>
                            <Donation name={user.isAnonymous ? 'You' : user.displayName} amountDonated={donationAmount} message={donationMessage} />
                            <h4>One last thing!</h4>
                            <p>We’re planning on expanding this service! Let us know what you think!</p>
                            <FeedBackForm user={user} setPosted={false} />
                        </NarrowCard>
                    :   <NarrowCard title={`Donate to ${capitalizedDoneeName}`}>
                            <Form onSubmit={processPayment} submitting={isLoading} submitValue={'Donate!'} submittingValue={'Processing...'} errorMessage={paymentResult} >
                                <RadioField labelText="Enter your donation amount" id="donation-quick-select" name="donation-quick-select" valueHook={onQuickSelectClick} options={[500, 1000, 2000, 'Custom Amount'].map(value => ({ value, text: isNaN(value) ? value : usdFormat(value) }))} />
                                {showCustomInput && <USDField id="donation-custom-amount" name="donation-custom-amount" valueHook={value => setDonationAmount(usdFormatToCents(value))} placeholder="or, you can enter a custom amount here" />}
                                <TextField id="donation-message" type="textarea" placeholder={`You can leave a message for ${donee.firstName} here!`} valueHook={setDonationMessage} />
                                <Order backgroundColor="#6247AA" productName={capitalizedDoneeName} charges={charges} />
                                <PaymentRequestButton stripe={stripe} {...chargePayload} />
                                <TextField id='name' required errorMessage='Please provide your name as it appears on your card' placeholder='Name' valueHook={setName} />
                                {user.isAnonymous && <EmailField valueHook={setEmail} />}
                                <TextField id='street-address-1' required errorMessage='Please provide a valid street address' placeholder='Street Address' valueHook={setStreetAddress} />
                                <TextField id='street-address-2' errorMessage='Please provide a valid street address' placeholder='Street Address 2' valueHook={setStreetAddress2} />
                                <TextField id='zip-code' required errorMessage='Please provide a valid zip code' placeholder='Zipcode' valueHook={setZipCode} />
                                <TextField id='city' required errorMessage='Please provide a city' placeholder='City' valueHook={setCity} />
                                <TextField id='state' required errorMessage='Please provide a state' placeholder='State' valueHook={setState} />
                                <CardElement
                                     options={{
                                        style: {
                                          base: {
                                            fontSize: '14px',
                                            color: '#E2CFEA',
                                            '::placeholder': { color: 'rgba(226, 207, 234, 0.7)' }
                                          },
                                          invalid: {
                                            color: '#9e2146',
                                          }
                                        }
                                      }}
                                />
                            </Form>
                        </NarrowCard>
                }
            </>
    )
}

export default CardForm
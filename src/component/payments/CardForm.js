import React, { useState } from 'react'
import Order from '../Order'
import Form from '../form'
import { capitalize, totalPrice, usdFormat, usdFormatToCents } from '../../utils'
import { PROCESSING_FEE_RATE, THEMES } from '../../utils/constants'
import { chargeWithToken } from '../../utils/payments'
import { TextField, USDField, RadioField } from '../form/input'
import { CardElement } from 'react-stripe-elements'
import { useHistory } from 'react-router-dom'
import { formatPaymentErrorMessage } from '../../utils/errorMessages'
import { performanceMonitor, MAX_ATTRIBUTE_VALUE_LENGTH } from '../../firebase'
import { ThemeContext } from '../provider/ThemeProvider'
import { analytics } from '../../firebase'
import { NarrowCard } from '../Card'
import { FeedBackForm } from '../page/Feedback'
import { Donation } from '../DonationFeed'

const CardForm = ({ user, stripe, donee, PaymentButton }) => {
    const [ paymentSuccessful, setPaymentSuccessful] = useState(false)
    const [ paymentResult, setPaymentResult ] = useState('')
    const [ isLoading, setIsLoading ] = useState(false)
    const [ name, setName ] = useState('')
    const [ streetAddress, setStreetAddress ] = useState('')
    const [ streetAddress2, setStreetAddress2 ] = useState('')
    const [ zipCode, setZipCode ] = useState('')
    const [ city, setCity ] = useState('')
    const [ state, setState ] = useState('')
    const [ donationAmount, setDonationAmount ] = useState(0)
    const [donationMessage, setDonationMessage ] = useState('')

    const history = useHistory()

    const capitalizedDoneeName = capitalize(donee.firstName)
    const processingFee = donationAmount === 0 ? 0 : (donationAmount * PROCESSING_FEE_RATE)
    const charges = [
        { name: capitalizedDoneeName, price: donationAmount },
        { name: 'Processing', price: processingFee }
    ]
    const totalCost = totalPrice(charges)

    const cardData = {
        name,
        address_line1: streetAddress,
        address_line2: streetAddress2,
        address_city: city,
        address_state: state,
        address_zip: zipCode,
        currency: 'usd'
    }

    const processPayment = () => {
        analytics.logEvent('set_checkout_option', {
            checkout_option: 'card_form'
        })
        setIsLoading(true)
        const tokenCreationTrace = performanceMonitor.trace('tokenCreation')
        tokenCreationTrace.start()
        stripe.createToken(cardData)
            .then(({ token }) => {
                tokenCreationTrace.putAttribute('result', 'success')
                chargeWithToken(token, donee, user, totalCost, processingFee, setPaymentSuccessful, setPaymentResult, 'card')
            })
            .catch(error => {
                const errorMessage = formatPaymentErrorMessage(error)
                tokenCreationTrace.putAttribute('result', 'fail')
                tokenCreationTrace.putAttribute('errorMessage', errorMessage.slice(0, MAX_ATTRIBUTE_VALUE_LENGTH))
                setPaymentResult(errorMessage)
            })
            .finally(() => {
                tokenCreationTrace.stop()
                setIsLoading(false)
            })
    }

    analytics.logEvent('begin_checkout', {
        currency: 'usd',
        items: [ donee.name ],
        value: donationAmount
    })

    const onQuickSelectClick = value => setDonationAmount(value)

    return (
            <>
                {paymentSuccessful
                    ?   <NarrowCard title="Thank You for your Donation!">
                            <h3>Here's a message from {donee.firstName}</h3>
                            <img className="completed-donation-img" src={require(`../../img/employment-headshot-mvp.jpg`)} alt={`${donee.firstName} ${donee.lastName}`} />
                            <p>{donee.thankYouMessage}</p>
                            <h4>We’ve sent a reciept to {user.email}</h4>
                            <Order productName={capitalizedDoneeName} charges={charges} />
                            <h4>Here's how your donation will appear on {donee.firstName}'s campaign</h4>
                            <Donation name="Test User" amountDonated={500} message="Good luck!" />
                            <h4>One last thing!</h4>
                            <p>We’re planning on expanding this service! Let us know what you think!</p>
                            <FeedBackForm user={{ email: 'foo@example.com', uid: 12132 }} setPosted={false} />
                        </NarrowCard>
                    :   <NarrowCard title={`Donate to ${capitalizedDoneeName}`}>
                            <Form onSubmit={processPayment} submitting={isLoading} submitValue={'Donate!'} submittingValue={'Processing...'} errorMessage={paymentResult} >
                                <RadioField labelText="Enter your donation amount" id="donation-quick-select" name="donation-quick-select" valueHook={onQuickSelectClick} options={[500, 1000, 2000].map(value => ({ value, text: usdFormat(value) }))} />
                                <USDField id="donation-custom-amount" name="donation-custom-amount" valueHook={value => setDonationAmount(usdFormatToCents(value))} placeholder="or, you can enter a custom amount here" />
                                <TextField id="donation-message" placeholder={`You can leave a message for ${donee.firstName} here!`} valueHook={setDonationMessage} />
                                <Order backgroundColor="#6247AA" productName={capitalizedDoneeName} charges={charges} />
                                <PaymentButton stripe={stripe} user={user} product={donee} totalCost={totalCost} setPaymentResult={setPaymentResult} setPaymentSuccessful={setPaymentSuccessful} processingFee={processingFee} />
                                <TextField id='name' required errorMessage='Please provide your name as it appears on your card' placeholder='Name' valueHook={setName} />
                                <TextField id='street-address-1' required errorMessage='Please provide a valid street address' placeholder='Street Address' valueHook={setStreetAddress} />
                                <TextField id='street-address-2' errorMessage='Please provide a valid street address' placeholder='Street Address 2' valueHook={setStreetAddress2} />
                                <TextField id='zip-code' required errorMessage='Please provide a valid zip code' placeholder='Zipcode' valueHook={setZipCode} />
                                <TextField id='city' required errorMessage='Please provide a city' placeholder='City' valueHook={setCity} />
                                <TextField id='state' required errorMessage='Please provide a state' placeholder='State' valueHook={setState} />
                                <ThemeContext.Consumer>
                                    {({ theme }) => (
                                    <CardElement style={{base: { fontSize: '14px', color: '#E2CFEA', "::placeholder": { color: '#E2CFEA' } }}} />
                                    )}
                                </ThemeContext.Consumer>
                            </Form>
                        </NarrowCard>
                }
            </>
    )
}

export default CardForm
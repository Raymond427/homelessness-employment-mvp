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

    const capitalizedDoneeName = capitalize(donee.name)
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
                    ?   <>
                            <h2>Payment Successful!</h2>
                            <p>We’ve sent a reciept to {user.email}</p>
                            <Order productName={capitalizedDoneeName} charges={charges} />
                            <button className="button" onClick={() => history.push(`/${donee.name}`)}>View Product</button>
                        </>
                    :   <>
                            <h2>Donate to {capitalizedDoneeName}</h2>
                            <Form onSubmit={processPayment} submitting={isLoading} submitValue={'Donate!'} submittingValue={'Processing...'} errorMessage={paymentResult} >
                                <RadioField labelText="Enter your donation amount" id="donation-quick-select" name="donation-quick-select" valueHook={onQuickSelectClick} options={[500, 1000, 2000].map(value => ({ value, text: usdFormat(value) }))} />
                                <USDField id="donation-custom-amount" name="donation-custom-amount" valueHook={value => setDonationAmount(usdFormatToCents(value))} placeholder="or, you can enter a custom amount here" />
                                <TextField id="donation-message" placeholder="Leave a message for the person in need!" valueHook={setDonationMessage} />
                                <Order productName={capitalizedDoneeName} charges={charges} />
                                <PaymentButton stripe={stripe} user={user} product={donee} totalCost={totalCost} setPaymentResult={setPaymentResult} setPaymentSuccessful={setPaymentSuccessful} processingFee={processingFee} />
                                <TextField id='name' required errorMessage='Please provide your name as it appears on your card' placeholder='Name' valueHook={setName} />
                                <TextField id='street-address-1' required errorMessage='Please provide a valid street address' placeholder='Street Address' valueHook={setStreetAddress} />
                                <TextField id='street-address-2' errorMessage='Please provide a valid street address' placeholder='Street Address 2' valueHook={setStreetAddress2} />
                                <TextField id='zip-code' required errorMessage='Please provide a valid zip code' placeholder='Zipcode' valueHook={setZipCode} />
                                <TextField id='city' required errorMessage='Please provide a city' placeholder='City' valueHook={setCity} />
                                <TextField id='state' required errorMessage='Please provide a state' placeholder='State' valueHook={setState} />
                                <ThemeContext.Consumer>
                                    {({ theme }) => (
                                        <CardElement style={{base: { fontSize: '14px', color: theme === THEMES.LIGHT ? '#121212' : '#FFFFFF', "::placeholder": { color: '#878787' } }}} />
                                    )}
                                </ThemeContext.Consumer>
                            </Form>
                        </>
                }
            </>
    )
}

export default CardForm
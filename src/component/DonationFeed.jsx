import React, { useState } from 'react'
import { usdFormat } from '../utils'
import Account from './icon/Account'
import '../styles/Donation.css'
import DonationProvider, { DonationContext } from './provider/DonationProvider'

export const Donation = ({ user, nameOnCard, anonymousDonation, amountDonated, message, messageWrap }) => {
    const [ showDefaultIcon, setShowDefaultIcon ] = useState(false)
    let donatorName = anonymousDonation ? 'Anonymous' : (nameOnCard || 'You')
    const donationMessageStyle = {
        textOverflow: messageWrap ? 'unset' : 'ellipsis',
        whiteSpace: messageWrap ? 'normal' : 'nowrap'
    }

    return (
        <div className="donation">
            {user.photoURL && !showDefaultIcon && !anonymousDonation
                ? <img className='account-icon account-profile' alt='account icon' src={user.photoURL} onError={() => setShowDefaultIcon(true)} />
                : <Account color="#FFFFFF" />}
            <div className="donation-info">
                <p className="donation-header">{donatorName} donated {usdFormat(amountDonated)}</p>
                {<p className="donation-message" style={donationMessageStyle}>{message}</p>}
            </div>
        </div>
    )
}

const DonationFeed = ({ campaignId, limit = 3, messageWrap = false }) => (
    <DonationProvider campaignId={campaignId} limit={limit}>
        <div className="donation-feed">
            <DonationContext.Consumer>
            {donations => donations.map(({ id, photoURL, name_on_card, anonymous_donation, donation_amount, donationMessage }) =>
                <Donation
                    key={id}
                    user={{ photoURL }}
                    nameOnCard={name_on_card}
                    anonymousDonation={anonymous_donation}
                    amountDonated={donation_amount}
                    message={donationMessage}
                    messageWrap={messageWrap}
                />
            )}
            </DonationContext.Consumer>
        </div>
    </DonationProvider>
)

export default DonationFeed
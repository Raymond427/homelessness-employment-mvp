import React from 'react'
import donations from '../data/donations.json'
import { usdFormat } from '../utils'
import Account from './icon/Account'
import '../styles/Donation.css'

export const Donation = ({ name, amountDonated, message }) => (
    <div className="donation">
        <Account />
        <div className="donation-info">
            <p className="donation-header">{name} donated {usdFormat(amountDonated)}</p>
            <p className="donation-message">{message}</p>
        </div>
    </div>
)

const DonationFeed = ({ doneeId, limit = 3 }) => (
    <div className="donation-feed">
        {donations
        .filter(donation => donation.doneeId === doneeId)
            .sort((a, b) => a.dateCreated < b.dateCreated)
                .map(donation => <Donation key={donation.id} {...donation} />)
                    .slice(0, limit)}
    </div>
)

export default DonationFeed
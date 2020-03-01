import React from 'react'
import donations from '../data/donations.json'
import { usdFormat } from '../utils'

const Donation = ({ name, amountDonated, message }) => (
    <div>
        <p>{name} donated {usdFormat(amountDonated)}</p>
        <p>{message}</p>
    </div>
)

const DonationFeed = ({ doneeId }) =>
    donations
        .filter(donation => donation.doneeId === doneeId)
            .sort((a, b) => a.dateCreated < b.dateCreated)
                .map(donation => <Donation key={donation.id} {...donation} />)

export default DonationFeed
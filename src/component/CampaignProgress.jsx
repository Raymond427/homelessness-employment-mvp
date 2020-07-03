import React from 'react'
import { usdFormat } from '../utils'
import '../styles/CampaignProgress.css'

const CampaignProgress = ({ amountDonated, goal, donationCount }) => {
    const amountToGo = goal - amountDonated

    return (
        <div className="campaign-progress">
            <small className="campaign-progress-amount-to-go">{amountToGo > 0 ? `${usdFormat(amountToGo)} to go!` : 'Goal Reached!'}</small>
            <progress className="campaign-progress-bar" max={goal} value={amountDonated} />
            <small className="campaign-progress-amount-zero">{usdFormat(0)}</small>
            <small className="campaign-progress-goal">{usdFormat(goal)}</small>
            <small className="campaign-progress-patrons">{`${donationCount} ${donationCount === 1 ? 'Donation' : 'Donations'}`}</small>
        </div>
    )
}

export default CampaignProgress
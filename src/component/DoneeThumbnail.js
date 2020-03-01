import React from 'react'
import Account from './icon/Account'
import { Link, useHistory } from 'react-router-dom'
import { PATHS } from '../utils/constants'
import DonationFeed from './DonationFeed'
import { usdFormat } from '../utils'

const DoneeThumbnail = ({ id, name, goal, amountDonated, description }) => {
    const history = useHistory()

    return (
        <div>
            {name}
            <Account />
            {description}
            <Link to={`${PATHS.PROFILE}/${id}`}>Learn More</Link>
            <progress max={goal} value={amountDonated} />
            <small>{usdFormat(amountDonated)}</small>
            <small>{usdFormat(goal)}</small>
            <DonationFeed doneeId={id} />
            <button onClick={() => history.push(`${PATHS.DONATE}/${id}`)}>Donate Now!</button>
        </div>
    )
}

export default DoneeThumbnail
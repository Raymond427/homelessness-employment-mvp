import React from 'react'
import { useHistory } from 'react-router-dom'
import { PATHS } from '../utils/constants'
import DonationFeed from './DonationFeed'
import Card from './Card'
import Button from './Button'
import CampaignProgress from './CampaignProgress'
import '../styles/DoneeThumbnail.css'

const DoneeThumbnail = ({ id, img, firstName, lastName, goal, amountDonated, donationCount, description }) => {
    const history = useHistory()
    const doneeCardStyles = {
        width: '15rem',
        margin: '-5rem auto 2rem auto',
        position: 'relative'
    }

    return (
        <div className="DoneeThumbnail">
            <img className="donee-img" src={require(`../img/${img}`)} alt={firstName} />
            <Card className="donee-thumbnail" title={`${firstName} ${lastName}`} style={{...doneeCardStyles}}>
                <p className="donee-thumbnail__desc">{description}</p>
                <CampaignProgress amountDonated={amountDonated} goal={goal} donationCount={donationCount} />
                <Button onClick={() => history.push(`${PATHS.PROFILE}/${id}`)}>Learn More About John</Button>
                <DonationFeed doneeId={id} limit={2} />
            </Card>
        </div>
    )
}

export default DoneeThumbnail
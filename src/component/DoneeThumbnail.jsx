import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { PATHS } from '../utils/constants'
import DonationFeed from './DonationFeed'
import Card from './Card'
import Button from './Button'
import CampaignProgress from './CampaignProgress'
import '../styles/DoneeThumbnail.css'
import ShareButton, { shareData } from './ShareButton'
import { CampaignContext } from './provider/CampaignProvider'
import Loading from './icon/Loading'

const DoneeThumbnail = () => {
    const { campaigns } = useContext(CampaignContext)

    console.log(campaigns)
    const history = useHistory()
    const doneeCardStyles = {
        width: '15rem',
        margin: '-5rem auto 2rem auto',
        position: 'relative'
    }

    return campaigns.length ? (
        <div className="DoneeThumbnail">
            <img className="donee-img" src={campaigns[0].photoURL} alt={campaigns[0].firstName} />
            <Card className="donee-thumbnail" title={`${campaigns[0].firstName} ${campaigns[0].lastName}`} style={{...doneeCardStyles}}>
                <p className="donee-thumbnail__desc">{campaigns[0].description}</p>
                <CampaignProgress amountDonated={campaigns[0].amountDonated} goal={campaigns[0].goal} donationCount={campaigns[0].donationCount} />
                <Button onClick={() => history.push(`${PATHS.PROFILE}/${campaigns[0].id}`)}>Learn More About John</Button>
                <ShareButton theme={'icon'} shareData={shareData(`${PATHS.PROFILE}/${campaigns[0].id}`)} />
                <DonationFeed doneeId={campaigns[0].id} limit={2} />
            </Card>
        </div>
    ) : (<Loading color='#FFFFFF' />)
}

export default DoneeThumbnail
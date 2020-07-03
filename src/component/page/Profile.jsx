import React, { useContext } from 'react'
import Page from "."
import { NarrowCard } from '../Card'
import CampaignProgress from '../CampaignProgress'
import { CampaignContext } from '../provider/CampaignProvider'
import Button from '../Button'
import { useHistory } from 'react-router-dom'
import { PATHS } from '../../utils/constants'
import DonationFeed from '../DonationFeed'
import Budget from '../Budget'
import '../../styles/Profile.css'
import PlanProgress from '../PlanProgress'
import ShareButton, { shareData } from '../ShareButton'
import { analytics } from '../../firebase'
import { capitalize } from '../../utils'
import Loading from '../icon/Loading'

export default ({ doneeId }) => {
    const history = useHistory()
    const { campaigns } = useContext(CampaignContext)
    const campaign = campaigns[0]

    campaigns.length && (analytics.logEvent(
        'checkout_progress',
        {
            items: {
                id: campaign.id,
                name: `${capitalize(campaign.firstName)} ${capitalize(campaign.lastName)}`,
                category: "Campaign Donation",
                list_position: 1,
                quantity: 1
            }
        }
    ))
    
    return (
        <Page pageClassName="Profile">
            {campaign ? (
                <>
                    <img className="donee-img" src={campaign.photoURL} alt={campaign.name} />
                    <NarrowCard className="profile-info" title="John wants to work in construction">
                        <CampaignProgress amountDonated={campaign.amountDonated} goal={campaign.goal} donationCount={campaign.donationCount} />
                        <Button onClick={() => history.push(`${PATHS.DONATE}/${campaign.id}`)}>Donate Now!</Button>
                        <ShareButton theme={'icon'} shareData={shareData(`${PATHS.PROFILE}/${campaign.id}`)} />
                        <h3>{`${campaign.firstName}'s Story`}</h3>
                        <p className="profile-info-story">{`${campaign.story}`}</p>
                    </NarrowCard>
                    <NarrowCard className="donee-plan">
                        <h3>{`${campaign.firstName}'s Plan`}</h3>
                        <PlanProgress plan={campaign.plan} />
                    </NarrowCard>
                    <NarrowCard className="donee-budget">
                        <h3>{`${campaign.firstName}'s Budget`}</h3>
                        <Budget budget={campaign.budget}/>
                    </NarrowCard>
                    <NarrowCard className="donee-supporters">
                        <h3>{`${campaign.firstName}'s Supporters`}</h3>
                        <DonationFeed campaignId={campaign.id} messageWrap limit={5} />
                    </NarrowCard>
                    <NarrowCard>
                        <h3>{`Organizations supporting ${campaign.firstName}`}</h3>
                        {campaign.organizations.map(({ name, description }) => (
                            <div key={name} className="profile-orgs">
                                <img className="profile-orgs-img" src={campaign.photoURL} alt={name} />
                                <p className="profile-orgs-description">{description}</p>
                            </div>
                        ))}
                    </NarrowCard>
                </>
            ) : (<Loading />)}
        </Page>
    )
}
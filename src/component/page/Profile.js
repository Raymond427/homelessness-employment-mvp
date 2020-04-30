import React from 'react'
import Page from "."
import { NarrowCard } from '../Card'
import CampaignProgress from '../CampaignProgress'
import Button from '../Button'
import { useHistory } from 'react-router-dom'
import { PATHS } from '../../utils/constants'
import DonationFeed from '../DonationFeed'
import Budget from '../Budget'
import '../../styles/Profile.css'
import PlanProgress from '../PlanProgress'
import ShareButton, { shareData } from '../ShareButton'

export default ({ donee }) => {
    const history = useHistory()
    
    return (
        <Page pageClassName="Profile">
            <img className="donee-img" src={require(`../../img/${donee.img}`)} alt={donee.name} />
            <NarrowCard className="profile-info" title="John wants to work in construction">
                <CampaignProgress amountDonated={donee.amountDonated} goal={donee.goal} donationCount={donee.donationCount} />
                <Button onClick={() => history.push(`${PATHS.DONATE}/${donee.id}`)}>Donate Now!</Button>
                <ShareButton theme={'icon'} shareData={shareData(`${PATHS.PROFILE}/${donee.id}`)} />
                <h3>{`${donee.firstName}'s Story`}</h3>
                <p className="profile-info-story">{`${donee.story}`}</p>
            </NarrowCard>
            <NarrowCard className="donee-plan">
                <h3>{`${donee.firstName}'s Plan`}</h3>
                <PlanProgress plan={donee.plan} />
            </NarrowCard>
            <NarrowCard className="donee-budget">
                <h3>{`${donee.firstName}'s Budget`}</h3>
                <Budget budget={donee.budget}/>
            </NarrowCard>
            <NarrowCard className="donee-supporters">
                <h3>{`${donee.firstName}'s Supporters`}</h3>
                <DonationFeed doneeId={donee.id} />
            </NarrowCard>
            <NarrowCard>
                <h3>{`Organizations supporting ${donee.firstName}`}</h3>
                {donee.organizations.map(({ img, name, description }) => (
                    <div key={name} className="profile-orgs">
                        <img className="profile-orgs-img" src={require(`../../img/${img}`)} alt={name} />
                        <p className="profile-orgs-description">{description}</p>
                    </div>
                ))}
            </NarrowCard>
        </Page>
    )
}
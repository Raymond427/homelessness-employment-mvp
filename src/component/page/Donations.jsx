import React from 'react'
import Order from '../Order'
import { PATHS } from '../../utils/constants'
import Page from '.'
import { NarrowCard } from '../Card'
import DonationProvider, { DonationContext } from '../provider/DonationProvider'

const Donations = ({ user }) => (
    <Page pageClassName="Donations">
        <NarrowCard title="Donations">
            <p>Have a question about a donation?</p>
            <a href={PATHS.EMAIL} target="_blank" rel="noopener noreferrer">
                Contact Us
            </a>
            <DonationProvider userId={user.uid}>
                <DonationContext.Consumer>
                    {donations => (
                        <div className="orders">
                            {donations.map(({ id, created, campaign_name, campaign_id, donation_amount, processing_fee }) => (
                                <Order
                                    key={id}
                                    id={id}
                                    backgroundColor="#6247AA"
                                    doneeName={campaign_name}
                                    dateCreated={created}
                                    charges={[
                                        { name: campaign_name, price: donation_amount },
                                        { name: 'Processing', price: processing_fee }
                                    ]}
                                    campaignId={campaign_id}
                                />)
                            )}
                            {donations.length === 0 && <p>No Donations Found</p>}
                        </div>
                    )}
                </DonationContext.Consumer>
            </DonationProvider>
        </NarrowCard>
    </Page>
)

export default Donations
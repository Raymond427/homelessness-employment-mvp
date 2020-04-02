import React from 'react'
import Order from '../Order'
import { PATHS } from '../../utils/constants'
import Page from '.'
import donations from '../../data/donations.json'
import { NarrowCard } from '../Card'

const Donations = () => (
    <Page pageClassName="Donations">
        <NarrowCard title="Donations">
            <p>Have a question about a donation?</p>
            <a href={PATHS.EMAIL_US} target="_blank" rel="noopener noreferrer">
                Contact Us
            </a>
            <div className="orders">
                {donations.map(({ id, donee: { firstName, lastName }, dateCreated, charges }) => (
                    <Order key={id} id={id} backgroundColor="#6247AA" doneeName={`${firstName} ${lastName}`} dateCreated={dateCreated} charges={charges} />)
                )}
            </div>
        </NarrowCard>
    </Page>
)

export default Donations
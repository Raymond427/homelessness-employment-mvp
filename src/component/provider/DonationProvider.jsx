import React, { useEffect, useState } from 'react'
import { getUserDonations, getCampaignDonations } from '../../firebase'

export const DonationContext = React.createContext()

export default ({ userId, campaignId, limit = 3, children }) => {
    const [ donations, setDonations ] = useState([])

    const updateDonations = snapShot => setDonations(
        snapShot.docs.map(doc =>
            ({ id: doc.id, ...doc.data() })
        )
    )
    let unSubscribeFromDonations = undefined

    useEffect(() => {
        unSubscribeFromDonations = userId
            ? getUserDonations(userId).onSnapshot(updateDonations)
            : getCampaignDonations(campaignId, limit).onSnapshot(updateDonations)

        return unSubscribeFromDonations
    }, [])
    
    return (userId || campaignId) ? (
        <DonationContext.Provider value={donations}>
            {children}
        </DonationContext.Provider>
    ) : null
}

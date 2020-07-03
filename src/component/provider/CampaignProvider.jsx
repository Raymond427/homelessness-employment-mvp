import React, { useEffect, useState } from 'react'
import { campaignSubscription } from '../../firebase'

export const CampaignContext = React.createContext()

export default ({ children }) => {
    const [ campaigns, setCampaigns ] = useState([])

    const updateCampaigns = snapShot => setCampaigns(
        snapShot.docs.map(doc =>
            ({ id: doc.id, ...doc.data() })
        )
    )
    let unSubscribeFromcampaigns = undefined

    useEffect(() => {
        unSubscribeFromcampaigns = campaignSubscription().onSnapshot(updateCampaigns)
        return unSubscribeFromcampaigns
    }, [])
    
    return (
        <CampaignContext.Provider value={{ campaigns }}>
            {children}
        </CampaignContext.Provider>
    )
}

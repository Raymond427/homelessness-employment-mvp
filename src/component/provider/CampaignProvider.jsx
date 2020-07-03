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
    let unSubscribeFromCampaigns = undefined

    useEffect(() => {
        unSubscribeFromCampaigns = campaignSubscription().onSnapshot(updateCampaigns)
        return unSubscribeFromCampaigns
    }, [])
    
    return (
        <CampaignContext.Provider value={{ campaigns }}>
            {children}
        </CampaignContext.Provider>
    )
}

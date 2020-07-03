import React, { useEffect, useState } from 'react'
import { donationSubscription } from '../../firebase'

export const DonationContext = React.createContext()
export const DonationConsumer = DonationContext.Consumer

export default ({ user, children }) => {
    const [ campaignDonations, setCampaignDonations ] = useState([])
    const [ userDonations, setUserDonations ] = useState([])

    const updateDonations = snapShot => setDonations(
        snapShot.docs.map(doc =>
            ({ id: doc.id, ...doc.data() })
        )
    )
    let unSubscribeFromDonations = undefined

    useEffect(() => {
        if (user) {
            unSubscribeFromDonations = donationSubscription(user.uid, updateDonations).onSnapshot(updateDonations)
            return unSubscribeFromDonations
        } else {
            setCampaignDonations([])
        }
    }, [ user ])
    
    return (
        <DonationContext.Provider value={{ campaignDonations, userDonations }}>
            {children}
        </DonationContext.Provider>       
    )
}

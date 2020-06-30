import React, { useEffect, useState } from 'react'
import { donationSubscription } from '../../firebase'

export const OrderContext = React.createContext()
export const OrderConsumer = OrderContext.Consumer

export default ({ user, children }) => {
    const [ orders, setOrders ] = useState([])

    const updateOrders = snapShot => setOrders(
        snapShot.docs.map(doc =>
            ({ id: doc.id, ...doc.data() })
        )
    )
    let unSubscribeFromOrders = undefined

    useEffect(() => {
        if (user) {
            unSubscribeFromOrders = donationSubscription(user.uid, updateOrders).onSnapshot(updateOrders)
            return unSubscribeFromOrders
        } else {
            setOrders([])
        }
    }, [ user ])
    
    return (
        <OrderContext.Provider value={{ orders }}>
            {children}
        </OrderContext.Provider>       
    )
}

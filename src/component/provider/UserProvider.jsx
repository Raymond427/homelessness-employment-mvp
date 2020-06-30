import React, { useState, useEffect } from 'react'
import { analytics, auth } from '../../firebase'

export const UserContext = React.createContext()

const UserProvider = ({ children }) => {
    const [ user, setUser ] = useState(() => auth.currentUser)

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setUser(user)
            if (user) {
                analytics.setUserId(user.uid)
            }
        })
        return () => unsubscribe()
    }, [])

    return (
        <UserContext.Provider value={{ user }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider
import React, { useState, useEffect } from 'react'

export const OnlineContext = React.createContext()

const OnlineProvider = ({ children }) => {
  const [ online, setOnline ] = useState(null)

  const isOnline = () => setOnline(true)
  const isOffline = () => setOnline(false)

  useEffect(() => {
    setOnline(navigator.onLine)
    window.addEventListener("online", isOnline)
    window.addEventListener("offline", isOffline)

    return () => {
      window.removeEventListener("online", isOnline)
      window.removeEventListener("offline", isOffline)
    }
  }, [])

    return (
        <OnlineContext.Provider value={{ online }}>
            {children}
        </OnlineContext.Provider>
    )
}

export default OnlineProvider
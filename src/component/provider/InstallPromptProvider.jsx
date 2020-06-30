import React, { useState, useEffect } from 'react'
// import { analytics } from '../../firebase'

export const InstallPromptContext = React.createContext()

const InstallPromptProvider = ({ children }) => {
    const [ installPrompt, setInstallPrompt ] = useState()

    const storeInstallPrompt = installPromptEvent => {
        installPromptEvent.preventDefault()
        setInstallPrompt(installPromptEvent)
    }

    const logAppInstallation = () => {
        // analytics.logEvent('app_installed')
        localStorage.setItem('installation_requested', true)
    }

    useEffect(() => {
        window.addEventListener('beforeinstallprompt', storeInstallPrompt)
        window.onbeforeinstallprompt = storeInstallPrompt

        window.addEventListener('appinstalled', logAppInstallation)
        window.onappinstalled = logAppInstallation

        return () => {
            window.removeEventListener('beforeinstallprompt', storeInstallPrompt)
            window.onbeforeinstallprompt = null
            window.removeEventListener('appinstalled', logAppInstallation)
            window.onappinstalled = null
        }
    }, [])

    const addToHomeScreen = () => {
        if (installPrompt) {
            installPrompt.prompt()
            installPrompt.userChoice.then(
                // choiceResult =>
                //    analytics.logEvent('install_prompt', { accepted: choiceResult.outcome === 'accepted' })
            )
        }
    }

    return (
        <InstallPromptContext.Provider value={{ addToHomeScreen }}>
            {children}
        </InstallPromptContext.Provider>
    )
}

export default InstallPromptProvider
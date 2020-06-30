import React, { useContext } from 'react'
import Button from './Button'
import { DialogContext } from './dialog'
import { DIALOG, FULL_URL } from '../utils/constants'
import Share from './icon/Share'
import '../styles/ShareButton.css'
import { analytics } from '../firebase'

const shareContent = (showDialog, shareData) => {
    const navigatorShareAvailable = 'share' in navigator
    analytics.logEvent('share_button_click')

    if (navigatorShareAvailable) {
        navigator.share(shareData)
            .then(() => analytics.logEvent('share', { type: 'native', path: shareData.path }))
                .catch(error => analytics.logEvent('native_share_failure', { error }))
    } else {
        showDialog(DIALOG.SHARE, shareData)
    }
}

export const shareData = path => ({
    title: 'The Pivot Fund',
    text: 'Hey! check out this campaign on The Pivot Fund!',
    url: FULL_URL(path),
    path
})

const ShareButton = ({ theme = 'icon', shareData }) => {
    const { showDialog } = useContext(DialogContext)
    return (
        theme === 'icon'
            ? <div className="ShareIconLink" onClick={() => shareContent(showDialog, shareData)}><Share /> Share this campaign</div>
            : <Button onClick={() => shareContent(showDialog, shareData)}>Share!</Button>
    )
}

export default ShareButton
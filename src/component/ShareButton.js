import React from 'react'
import Button from './Button'
import { DialogConsumer } from './dialog'
import { DIALOG, FULL_URL } from '../utils/constants'
import Share from './icon/Share'
import '../styles/ShareButton.css'

const shareContent = (showDialog, shareData) => {
    const navigatorShareAvailable = 'share' in navigator

    if (navigatorShareAvailable) {
        navigator.share(shareData)
            .then(() => console.log('shared!'))
                .catch(() => console.log('failed!'))
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
    return (
        <DialogConsumer>
            {({ showDialog }) => (
                theme === 'icon'
                    ? <div className="ShareIconLink" onClick={() => shareContent(showDialog, shareData)}><Share /> Share this campaign</div>
                    : <Button onClick={() => shareContent(showDialog, shareData)}>Share!</Button>
            )}
        </DialogConsumer>
    )
}

export default ShareButton
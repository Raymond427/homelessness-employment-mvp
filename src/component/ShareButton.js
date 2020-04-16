import React from 'react'
import Button from './Button'
import { DialogConsumer } from './dialog'

const shareContent = shareInfo => {
    const navigatorShareAvailable = 'share' in navigator

    if (navigatorShareAvailable) {

    } else {
    }
}

const ShareButton = ({ type, shareInfo }) => {
    return (
        <DialogConsumer>
            {({ showDialog }) => (
                <Button onClick={() => showDialog => shareContent(showDialog)}>Share!</Button>
            )}
        </DialogConsumer>
    )
}

export default ShareButton
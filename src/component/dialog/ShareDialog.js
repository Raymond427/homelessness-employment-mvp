import React from 'react'
import { FULL_URL } from '../../utils/constants'
import '../../styles/ShareDialog.css'

const ShareDialog = ({ path }) => {
    const faceBookShareURL = `https://www.facebook.com/sharer.php?u=${FULL_URL(path)}`
    const twitterShareURL = `https://twitter.com/intent/tweet?url=${FULL_URL(path)}&text=Check%20out%20this%20campaign%20on%20The%20Pivot%20Fund!`
    const linkedInShareURL = `https://www.linkedin.com/sharing/share-offsite/?url=http%3A%2F%2Fpivotfund.org`

    return (
        <>
            <h3 className="ShareButton-header">Share this campaign with your friends!</h3>
            <div className="ShareButton-link-wrapper">
                <a className="ShareButton-link" href={faceBookShareURL} target="_blank" rel="noopener noreferrer">Facebook</a>
                <a className="ShareButton-link" href={twitterShareURL} target="_blank" rel="noopener noreferrer">Twitter</a>
                <a className="ShareButton-link" href={linkedInShareURL} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </div>
        </>
    )
}

export default ShareDialog
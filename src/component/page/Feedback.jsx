import React, { useState } from 'react'
import { TextField, RatingField } from '../form/input'
import Form from '../form'
import { postFeedback, performanceMonitor, MAX_ATTRIBUTE_VALUE_LENGTH, analytics } from '../../firebase'
import '../../styles/Feedback.css'

export const FeedbackForm = ({ user, email }) => {
    const [ rating, setRating ] = useState(0)
    const [ comment, setComment ] = useState('')
    const [ isPosting, setIsPosting ] = useState(false)
    const [ postingError, setPostingError ] = useState('')
    const [ feedbackPosted, setFeedbackPosted ] = useState(false)

    const handlePost = async () => {
        setIsPosting(true)
        const feedbackPostTrace = performanceMonitor.trace('submitFeedback')
        feedbackPostTrace.start()

        try {
            await postFeedback({ rating, comment, email, userid: user.uid })
            feedbackPostTrace.putAttribute('result', 'success')
            setFeedbackPosted(true)
        } catch ({ message }) {
            feedbackPostTrace.putAttribute('errorMessage', message.slice(0, MAX_ATTRIBUTE_VALUE_LENGTH))
            feedbackPostTrace.putAttribute('result', 'fail')
            setPostingError(message)
        }

        feedbackPostTrace.putAttribute('commentLength', `${comment.length}`)
        feedbackPostTrace.stop()
        analytics.logEvent('give_feedback', { rating: `${rating}` })
        setIsPosting(false)
    }

    return (
        feedbackPosted ? (
            <h1>Thank you for your feedback!</h1>
        ): (
            <Form submitValue='Give Feedback' submittingValue="Submitting your feedback..." onSubmit={handlePost} submitting={isPosting} errorMessage={postingError}>
                <RatingField id='rating' required errorMessage='Please provide a rating' valueHook={setRating} />
                <TextField id='feedback' type='textarea' placeholder='Enter your thoughts' valueHook={setComment} />
            </Form>
        )
    )
}

export default FeedbackForm
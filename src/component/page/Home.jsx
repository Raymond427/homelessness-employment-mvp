import React, { useState } from 'react'
import Page from "."
import Logo from '../../img/Logo'
import CharlotteDesktop from '../../img/charlottebg4k.jpg'
import CharlotteMobile from '../../img/charlotte1024.jpg'
import { postComingSoonSubscriber } from '../../firebase'
import '../../styles/Home.css'
// import DoneeThumbnail from '../DoneeThumbnail'
// import PCMeeting from '../../img/PCMeeting.png'
// import FundingPivot from '../../img/FundingPivot.png'
// import Share from '../../img/Share.png'

export default () => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubscribed, setIsSubscribed] = useState(false)
    const [submissionError, setSubmissionError] = useState('')

    const handleSubmit = async event => {
        event.preventDefault()

        if (isSubmitting) return

        const emailInput = event.currentTarget.querySelector('#coming-soon-email')
        const email = emailInput.value.trim()
        emailInput.value = email
        setSubmissionError('')
        setIsSubmitting(true)

        if (!emailInput.checkValidity()) {
            setSubmissionError('Please enter a valid email address.')
            setIsSubmitting(false)
            return
        }

        try {
            await postComingSoonSubscriber({ email })
            setIsSubscribed(true)
        } catch (error) {
            console.error('Unable to save coming-soon subscriber:', error)
            setSubmissionError('Sorry, we could not save your email. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Page pageClassName="Home coming-soon" hideNavBar>
            <main className="coming-soon__content">
                <Logo className="coming-soon__logo" color="#6247AA" />
                <h1 className="coming-soon__headline">
                    Local nonprofits, engineers and philanthropists are
                    <br />
                    coming together to make a new way to help
                    <br />
                    Charlotteans help each other
                </h1>
                {isSubscribed ? (
                    <p className="coming-soon__prompt" role="status">
                        Thank you! We will notify you when we launch.
                    </p>
                ) : (
                    <>
                        <p className="coming-soon__prompt">Enter your email to be notified when we launch</p>
                        <form className="coming-soon__form" noValidate onSubmit={handleSubmit}>
                            <label className="coming-soon__email-label" htmlFor="coming-soon-email">
                                <span className="coming-soon__sr-only">Email Address</span>
                                <input
                                    id="coming-soon-email"
                                    className="coming-soon__email"
                                    type="email"
                                    name="email"
                                    placeholder="Email Address"
                                    required
                                />
                            </label>
                            <button
                                className="coming-soon__submit"
                                type="submit"
                                disabled={isSubmitting}
                                aria-busy={isSubmitting}
                                aria-label={isSubmitting ? 'Submitting email' : undefined}
                            >
                                {isSubmitting ? (
                                    <span className="coming-soon__spinner" aria-hidden="true" />
                                ) : 'Submit'}
                            </button>
                        </form>
                        {submissionError && (
                            <p className="coming-soon__error" role="alert">{submissionError}</p>
                        )}
                    </>
                )}
            </main>
            <picture className="coming-soon__background">
                <source media="(max-width: 768px)" srcSet={CharlotteMobile} />
                <img className="coming-soon__background-image" src={CharlotteDesktop} alt="" />
            </picture>
        </Page>
    // <Page pageClassName="Home" hideBack>
    //     <div className="home-background"></div>
    //     <div className="home-content">
    //         <div className="home-content--wrapper">
    //             <header className="home-header">
    //                 <Logo className="main-logo" color="#FFFFFF" />
    //                 <p className="home-sub-header">Your current situation is never your final destination. All it takes is a pivot.</p>
    //             </header>
    //             <DoneeThumbnail />
    //         </div>
    //         <div className="home-description-wrapper">
    //             <h2 className="home-description">Tackling the issue of homelessness is no easy task. It requires a lot more than an individual effort. It requires consistent collaboration from everyone; a community effort.</h2>
    //             <h2 className="home-description home-strong-line">With The Pivot Fund, you can help someone start a new career and end homelessness for good.</h2>
    //             <div className="how-it-works-wrapper">
    //                 <div className="how-it-works how-it-works-1">
    //                     <img alt="Pivot candidate meeting" src={PCMeeting} />
    //                     <div className="how-it-works-description">
    //                         <h3>View our campaigns</h3>
    //                         <p>Every candidate on The Pivot Fund is referred to us by a local homeless shelter.</p>
    //                     </div>
    //                 </div>
    //                 <div className="how-it-works how-it-works-2">
    //                     <div className="how-it-works-description">
    //                         <h3>Fund someone's Pivot</h3>
    //                         <p>You’ll get a personalized email introducing you to the candidate you’re supporting every month and the opportunity to learn more about their unique story.</p>
    //                     </div>
    //                     <img alt="Looking for pivots on the computer" src={FundingPivot} />
    //                 </div>
    //                 <div className="how-it-works how-it-works-3">
    //                     <img alt="Spreading the word about Pivot" src={Share} />
    //                     <div className="how-it-works-description">
    //                         <h3>Share the transformation</h3>
    //                         <p>Help us build our team in the fight against homelessness. Use the links in this app and your emails to share your pivot's story with your friends and boost your impact!</p>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // </Page>
    )
}

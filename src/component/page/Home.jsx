import React from 'react'
import Page from "."
import DoneeThumbnail from '../DoneeThumbnail'
import '../../styles/Home.css'
import Logo from '../../img/Logo'
import PCMeeting from '../../img/PCMeeting.png'
import FundingPivot from '../../img/FundingPivot.png'
import Share from '../../img/Share.png'

export default () => (
    <Page pageClassName="Home" hideBack>
        <div className="home-background"></div>
        <div className="home-content">
            <div className="home-content--wrapper">
                <header className="home-header">
                    <Logo className="main-logo" color="#FFFFFF" />
                    <p className="home-sub-header">Your current situation is never your final destination. All it takes is a pivot.</p>
                </header>
                <DoneeThumbnail />
            </div>
            <div className="home-description-wrapper">
                <h2 className="home-description">Tackling the issue of homelessness is no easy task. It requires a lot more than an individual effort. It requires consistent collaboration from everyone; a community effort.</h2>
                <h2 className="home-description home-strong-line">With The Pivot Fund, you can help someone start a new career and end homelessness for good.</h2>
                <div className="how-it-works-wrapper">
                    <div className="how-it-works how-it-works-1">
                        <img alt="Pivot candidate meeting" src={PCMeeting} />
                        <div className="how-it-works-description">
                            <h3>View our campaigns</h3>
                            <p>Every candidate on The Pivot Fund is referred to us by a local homeless shelter.</p>
                        </div>
                    </div>
                    <div className="how-it-works how-it-works-2">
                        <div className="how-it-works-description">
                            <h3>Fund someone's Pivot</h3>
                            <p>You’ll get a personalized email introducing you to the candidate you’re supporting every month and the opportunity to learn more about their unique story.</p>
                        </div>
                        <img alt="Looking for pivots on the computer" src={FundingPivot} />
                    </div>
                    <div className="how-it-works how-it-works-3">
                        <img alt="Spreading the word about Pivot" src={Share} />
                        <div className="how-it-works-description">
                            <h3>Share the transformation</h3>
                            <p>Help us build our team in the fight against homelessness. Use the links in this app and your emails to share your pivot's story with your friends and boost your impact!</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Page>
)

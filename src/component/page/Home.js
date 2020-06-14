import React from 'react'
import Page from "."
import DoneeThumbnail from '../DoneeThumbnail'
import donees from '../../data/donees'
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
                <DoneeThumbnail {...donees[0]} />
            </div>
            <div className="home-description-wrapper">
                <h2 className="home-description">Tackling the issue of homelessness is no easy task. It requires a lot more than an individual effort. It requires consistent collaboration from everyone; a community effort.</h2>
                <h2 className="home-description home-strong-line">With The Pivot Fund, you can help someone start a new career and end homelessness for good.</h2>
                <div className="how-it-works-wrapper">
                    <div className="how-it-works how-it-works-1">
                        <img alt="" src={PCMeeting} />
                        <div className="how-it-works-description">
                            <h3>View our campaigns</h3>
                            <p>Every candidate on The Pivot Fund is referred to us by a local homeless shelter or their local. From there we provide them with a dedicated pivot coach (PC) a Pivot Fund employee who supports/coaches them into their new career!</p>
                        </div>
                    </div>
                    <div className="how-it-works how-it-works-2">
                        <div className="how-it-works-description">
                            <h3>Fund someone's Pivot</h3>
                            <p>Support an individual or fund everyone equally. Want the ultimate experience? Become an official member of The Pivot Fund.You’ll get a personalized email introducing you to a new candidate  you’re supporting every month and the opportunity to learn more about their unique story.</p>
                        </div>
                        <img alt="" src={FundingPivot} />
                    </div>
                    <div className="how-it-works how-it-works-3">
                        <img alt="" src={Share} />
                        <div className="how-it-works-description">
                            <h3>Share the transformation</h3>
                            <p>Donating is just the beginning! Opt in for the opportunity to receive live progress updates from each person you fund and encourage them with supportive comments as they progress in their career.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Page>
)

import React from 'react'
import Page from "."
import DoneeThumbnail from '../DoneeThumbnail'
import donees from '../../data/donees'
import '../../styles/Home.css'
import Logo from '../../img/Logo'

export default () => (
    <Page pageClassName="Home" hideBack>
        <div className="home-background"></div>
        <div className="home-content--wrapper">
            <header className="home-header">
                <Logo className="main-logo" color="#FFFFFF" />
                <p className="home-sub-header">Help fund a journey back into the workforce through a sturctured path to employment. Supported by social workers, career coaches and humanitarian organizations along the way</p>
            </header>
            <DoneeThumbnail {...donees[0]} />
        </div>
    </Page>
)

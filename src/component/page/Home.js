import React from 'react'
import Page from "."
import DoneeThumbnail from '../DoneeThumbnail'
import donees from '../../data/donees'
import '../../styles/Home.css'

export default () => (
    <Page pageClassName="Home" hideBack>
        <div className="home-background"></div>
        <div className="home-content--wrapper">
            <header className="home-header">
                <h1>The Pivot Fund</h1>
                <p style={{ margin: '0 auto 2rem 0' }}>Help fund a journey back into the workforce through a sturctured path to employment. Supported by social workers, career coaches and humanitarian organizations along the way</p>
            </header>
            <DoneeThumbnail {...donees[0]} />
        </div>
    </Page>
)

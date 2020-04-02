import React from 'react'
import Page from "."
import DoneeThumbnail from '../DoneeThumbnail'
import donees from '../../data/donees'
import '../../styles/Home.css'

export default () => (
    <Page pageClassName="Home" hideBack>
        <DoneeThumbnail {...donees[0]} />
    </Page>
)

import React from 'react'
import Page from "."
import DoneeThumbnail from '../DoneeThumbnail'
import donees from '../../data/donees'

export default () => (
    <Page pageClassName="Home" hideBack>
        <h1>Homelessness Employment</h1>
        <DoneeThumbnail {...donees[0]} />
    </Page>
)

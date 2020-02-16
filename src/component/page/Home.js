import React from 'react'
import Page from "."
import { Link } from "react-router-dom"
import { PATHS } from "../../utils/constants"

export default () => (
    <Page pageClassName="Home" hideBack>
        <h1>Homelessness Employment</h1>
        {/* <Link to={`${PATHS.BUY}/exampleProduct`}>Example Product Purchase</Link> */}
    </Page>
)

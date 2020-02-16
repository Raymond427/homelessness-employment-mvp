import React from 'react'
import Page from "."
import { Link } from "react-router-dom"
import { PATHS } from "../../utils/constants"

export default () => (
    <Page pageClassName="Home">
        <h1>Firebase PWA Template</h1>
        <Link to={`${PATHS.BUY}/exampleProduct`}>Example Product Purchase</Link>
    </Page>
)

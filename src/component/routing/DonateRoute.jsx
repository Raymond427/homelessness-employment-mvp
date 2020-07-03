import React from 'react'
import { Redirect } from 'react-router-dom'
import { PATHS } from '../../utils/constants'

const DonateRoute = ({ condition = true, Component, redirectOnRestricted = PATHS.HOME, computedMatch, user, ...rest }) => {
    const doneeId = computedMatch.params.doneeId
    if (!doneeId) {
        return <Redirect to={PATHS.HOME} />
    }

    return condition
        ? <Component user={user} {...rest} />
        : <Redirect to={{ pathname: PATHS.SIGN_UP, state: { newUser: true, pathOnSignIn: `${PATHS.DONATE}/${doneeId}` }}} />
}

export default DonateRoute
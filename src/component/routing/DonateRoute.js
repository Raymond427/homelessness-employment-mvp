import React from 'react'
import { Redirect } from 'react-router-dom'
import { PATHS } from '../../utils/constants'
import donees from '../../data/donees.json'

const DonateRoute = ({ condition = true, Component, redirectOnRestricted = PATHS.HOME, computedMatch, user, ...rest }) => {
    const doneeId = computedMatch.params.doneeId
    if (!doneeId) {
        return <Redirect to={PATHS.HOME} />
    }

    const donee = donees.find(donee => donee.id === doneeId)

    if (!donee) {
        return <Redirect to={PATHS.HOME} />
    }

    return condition
        ? <Component donee={donee} user={user} {...rest} />
        : <Redirect to={{ pathname: PATHS.LOGIN, state: { pathOnSignIn: `${PATHS.DONATE}/${doneeId}` }}} />
}

export default DonateRoute
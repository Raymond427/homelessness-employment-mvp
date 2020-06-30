import React from 'react'
import { Redirect } from 'react-router-dom'
import { PATHS } from '../../utils/constants'
import donees from '../../data/donees.json'

const ProfileRoute = ({ condition = true, Component, computedMatch, ...rest }) => {
    const doneeId = computedMatch.params.doneeId
    if (!doneeId) {
        return <Redirect to={PATHS.HOME} />
    }

    const donee = donees.find(donee => donee.id === doneeId)

    if (!donee) {
        return <Redirect to={PATHS.HOME} />
    }

    return <Component donee={donee} {...rest} />
}

export default ProfileRoute
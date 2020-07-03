import React from 'react'
import { Redirect } from 'react-router-dom'
import { PATHS } from '../../utils/constants'

const ProfileRoute = ({ condition = true, Component, computedMatch, ...rest }) => {
    const doneeId = computedMatch.params.doneeId
    
    if (!doneeId) {
        return <Redirect to={PATHS.HOME} />
    }

    return <Component donee={doneeId} {...rest} />
}

export default ProfileRoute
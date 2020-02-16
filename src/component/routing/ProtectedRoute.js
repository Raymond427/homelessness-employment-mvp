import React from 'react'
import { Redirect } from 'react-router-dom'
import { PATHS } from '../../utils/constants'

const ProtectedRoute = ({ condition, Component, pathIfRestricted = PATHS.HOME, ...rest }) => (
    condition ? <Component {...rest} /> : <Redirect to={pathIfRestricted} noThrow />
)

export default ProtectedRoute
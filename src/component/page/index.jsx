import React from 'react'
import Navigation from '../navigation'

const Page = ({ children, pageClassName, hideNavBar, ...rest }) => (
    <div className={`${pageClassName} page`}>
        {!hideNavBar && <Navigation {...rest} />}
        {children}
    </div>
)

export default Page
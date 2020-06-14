import React from 'react'
import Navigation from '../navigation'
import Footer from '../Footer'

const Page = ({ children, pageClassName, hideNavBar, ...rest }) => (
    <div className={`${pageClassName} page`}>
        {!hideNavBar && <Navigation {...rest} />}
        {children}
        {/* <Footer /> */}
    </div>
)

export default Page
import { useEffect } from 'react'

const ScrollToTop = ({ children }) => {
    useEffect(() => {
        window.location.hash === '' && window.scrollTo(0, 0)
    }, [ window.location.href ])

    return children
}

export default ScrollToTop
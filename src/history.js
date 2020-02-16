import { createBrowserHistory } from 'history'
// import { analytics } from './firebase'
import { PAGE_TITLES } from './utils/constants'

const history = createBrowserHistory()
history.listen(// location =>
    // analytics.logEvent('page_view', {
    //     page_path: location.pathname,
    //     page_location: window.location.href,
    //     page_title: PAGE_TITLES[location.pathname] || location.pathname
    // })
)

export default history
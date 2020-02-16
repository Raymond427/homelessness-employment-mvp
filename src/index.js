import React from 'react'
import ReactDOM from 'react-dom'
import './styles/index.css'
import App from './component'
import { Router } from 'react-router-dom'
import ScrollToTop from './component/ScrollToTop'
import history from './history'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(
    <Router history={history}>
        <ScrollToTop>
            <App />
        </ScrollToTop>
    </Router>,
    document.getElementById('root')
)

// Enable to active service worker and PWA features
// serviceWorker.register()
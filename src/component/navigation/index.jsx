import React, { useContext } from 'react'
import '../../styles/Navigation.css'
import AuthenticationLinks from './AuthenticationLinks'
import Arrow from '../icon/Arrow'
import MiniLogo from '../icon/MiniLogo'
import ThemeToggler from '../theme/ThemeToggler'
import { UserContext } from '../provider/UserProvider'
import { withRouter } from 'react-router-dom'
import { PATHS } from '../../utils/constants'
import Offline from '../icon/Offline'
import { OnlineContext } from '../provider/OnlineProvider'

const OfflineLabel = ({ hideBack, onHomePage }) => {
    const color = onHomePage ? '#FFFFFF' : 'var(--secondary-text-color)'

    return (
        <div className="offline-label" style={{ left: hideBack ? '1rem' : '4.5rem' }}>
            <Offline color={onHomePage ? '#FFFFFF' : 'var(--secondary-text-color)'} />
            <span style={{ color }}>Offline</span>
        </div>
    )
}

export default withRouter(({ hideLogo = false, hideBack = false, showThemeToggle = false, history }) => {
    const onHomePage = history.location.pathname === PATHS.HOME
    const { online } = useContext(OnlineContext)
    const { user } = useContext(UserContext)

    return (
            <nav className="nav">
                <div className="nav-left-content">
                    {!hideBack &&
                        <button className="back-button" onClick={() => history.goBack()}>
                            <Arrow left />
                        </button>}
                </div>
                {!online && <OfflineLabel hideBack={hideBack} onHomePage={onHomePage} />}
                {!hideLogo && !onHomePage &&
                    <button className="nav-home-button" onClick={() => history.push(PATHS.HOME)}>
                        <MiniLogo />
                    </button>}
                {user && showThemeToggle && <ThemeToggler />}
                <AuthenticationLinks history={history} onHomePage={onHomePage} />
            </nav>
    )
})

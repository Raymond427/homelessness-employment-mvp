import React from 'react'
import '../../styles/Navigation.css'
import AuthenticationLinks from './AuthenticationLinks'
import Arrow from '../icon/Arrow'
import MiniLogo from '../icon/MiniLogo'
import ThemeToggler from '../theme/ThemeToggler'
import { UserContext } from '../provider/UserProvider'
import { withRouter, Link } from 'react-router-dom'
import { PATHS } from '../../utils/constants'
import Offline from '../icon/Offline'
import { OnlineContext } from '../provider/OnlineProvider'

const OfflineLabel = ({ history, hideBack }) => {
    const onHomePage = history.location.pathname === PATHS.HOME
    const color = onHomePage ? '#FFFFFF' : 'var(--primary-text-color)'

    return (
        <div className="offline-label" style={{ left: hideBack ? '1rem' : '4.5rem' }}>
            <Offline color={onHomePage ? '#FFFFFF' : 'var(--primary-text-color)'} />
            <span style={{ color }}>Offline</span>
        </div>
    )
}

export default withRouter(({ hideLogo = false, hideBack = false, showThemeToggle = false, history }) => {
    const onHomePage = history.location.pathname === PATHS.HOME

    return (
    <OnlineContext.Consumer>
        {({ online }) =>
            <UserContext.Consumer>
                {({ user }) =>
                    <nav className="nav">
                        <div className="nav-left-content">
                            {!hideBack &&
                                <button className="back-button" onClick={() => history.goBack()}>
                                    <Arrow left />
                                </button>}
                            <Link to={PATHS.ABOUT_US} className="nav-link" style={{
                                    left: hideBack ? '1rem' : '5rem',
                                    color: onHomePage ? '#FFFFFF' : 'var(--primary-background-color)'
                            }}>About Us</Link>
                        </div>
                        {!online && <OfflineLabel history={history} hideBack={hideBack} />}
                        {!hideLogo && !onHomePage &&
                            <button className="nav-home-button" onClick={() => history.push(PATHS.HOME)}>
                                <MiniLogo />
                            </button>}
                        {user && showThemeToggle && <ThemeToggler />}
                        <AuthenticationLinks history={history} />
                    </nav>
                }
            </UserContext.Consumer>
        }
    </OnlineContext.Consumer>
)})

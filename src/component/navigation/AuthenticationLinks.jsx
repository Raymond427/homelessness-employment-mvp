import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../provider/UserProvider'
import '../../styles/AuthenticationLinks.css'
import Account from '../icon/Account'
import { PATHS } from '../../utils/constants'

const SignInAndSignUpLinks = ({ onHomePage }) => (
    <div className="AuthenticationLinks">
        <Link to={{pathname: PATHS.LOGIN, state: { newUser: false }}} style={{ color: onHomePage ? '#FFFFFF' : 'var(--primary-background-color)' }}>Sign In</Link>
        <Link to={{pathname: PATHS.SIGN_UP, state: { newUser: true }}} style={{ color: onHomePage ? '#FFFFFF' : 'var(--primary-background-color)' }}>Sign Up</Link>
    </div>
)

const AccountLink = ({ user: { photoURL }, history, onHomePage }) => {
    const [ showDefaultIcon, setShowDefaultIcon ] = useState(false)

    return (
        <button className="account-link" onClick={() => history.push(PATHS.ACCOUNT)}>
            {photoURL && !showDefaultIcon ? <img className='account-icon account-profile' alt='account icon' src={photoURL} onError={() => setShowDefaultIcon(true)} /> : <Account color={onHomePage ? '#FFFFFF' : 'var(--secondary-text-color)'} />}
        </button>
    )
}

const AuthenticationLinks = ({ history, onHomePage }) => {
    const { user } = useContext(UserContext)

    return (
        <div>
            {user
                ? <AccountLink user={user} history={history} onHomePage={onHomePage} />
                : <SignInAndSignUpLinks onHomePage={onHomePage} />
            }
        </div>
    )
}

export default AuthenticationLinks
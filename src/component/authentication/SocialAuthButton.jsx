import React from 'react'
import '../../styles/SocialAuthButton.css'
import GoogleLogo from '../icon/GoogleLogo'
import FacebookLogo from '../icon/FacebookLogo'

export default ({ name, onClick, newUser }) => (
    <button className="social-auth-button" id={`${name}-button`} onClick={onClick}>
        {name === 'google' ? <GoogleLogo /> : <FacebookLogo />}
        <span>{name === 'google' ? `Sign ${newUser ? 'up' : 'in'} with Google` : 'Continue with Facebook'}</span>
    </button>
)
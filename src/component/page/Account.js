import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import '../../styles/Account.css'
import { PATHS } from '../../utils/constants'
import { auth } from '../../firebase'
import Page from '.'

const Account = ({ user }) => (
    <Page pageClassName="Account">
        <h1>Account</h1>
        <ul className="account-links">
            {user && user && <li>{user.email}</li>}
            <li id="account-link-log-out" onClick={() => auth.signOut()}>
                Log Out
            </li>
            <li>
                <Link to={PATHS.ORDERS}>Orders</Link>
            </li>
            <li>
                <Link to={PATHS.FEEDBACK}>Give Feedback</Link>
            </li>
            <li>
                <a href={PATHS.EMAIL_US} target="_blank" rel="noopener noreferrer">
                    Contact Us
                </a>
            </li>
        </ul>
        {!user && <Redirect to={PATHS.HOME} />}
    </Page>
)

export default Account
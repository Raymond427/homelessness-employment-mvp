import React from 'react'
import { Link } from 'react-router-dom'
import '../../styles/Account.css'
import { PATHS } from '../../utils/constants'
import { auth } from '../../firebase'
import { NarrowCard } from '../Card'
import Page from '.'

const Account = ({ user }) => (
    <Page pageClassName="Account">
        <NarrowCard title="Account">
            <ul className="account-links">
                {user && user && <li>{user.email}</li>}
                <li id="account-link-log-out" onClick={() => auth.signOut()}>
                    Log Out
                </li>
                <li>
                    <Link to={PATHS.DONATIONS}>Donations</Link>
                </li>
                <li>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                        Contact Us
                    </a>
                </li>
                {/* <li>
                    <Link to={PATHS.FEEDBACK}>Give Feedback</Link>
                </li> */}
            </ul>
        </NarrowCard>
    </Page>
)

export default Account
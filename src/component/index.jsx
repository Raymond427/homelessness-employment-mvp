import React from 'react'
import '../styles/App.css'
import { Switch, Route } from 'react-router-dom'
import Home from './page/Home'
import ResetPassword from './page/ResetPassword'
import Login from './page/Login'
import Account from './page/Account'
import Profile from './page/Profile'
import Donations from './page/Donations'
import Payment from './page/Payment'
import ProtectedRoute from './routing/ProtectedRoute'
import UserManagementRoute from './routing/UserManagementRoute'
import ThemeProvider from './provider/ThemeProvider'
import UserProvider, { UserContext } from './provider/UserProvider'
import { PATHS } from '../utils/constants'
import OnlineProvider from './provider/OnlineProvider'
import InstallPromptProvider from './provider/InstallPromptProvider'
import Dialog from './dialog'
import donees from '../data/donees.json'
import DonateRoute from './routing/DonateRoute'
import ProfileRoute from './routing/ProfileRoute'

const App = () => (
    <InstallPromptProvider>
        <Dialog>
            <ThemeProvider>
                <OnlineProvider>
                    <UserProvider>
                        <UserContext.Consumer>
                            {({ user }) => (
                                <Switch>
                                    <Route exact path={PATHS.HOME}>
                                        <Home />
                                    </Route>
                                    <Route exact path={PATHS.LOGIN}>
                                        <Login user={user} />
                                    </Route>
                                    <Route exact path={PATHS.SIGN_UP}>
                                        <Login user={user} />
                                    </Route>
                                    <ProfileRoute exact path={`${PATHS.PROFILE}/:doneeId`} Component={Profile} />
                                    <UserManagementRoute path={PATHS.USER_MANAGEMENT} />
                                    <ProtectedRoute
                                        path={PATHS.RESET_PASSWORD}
                                        condition={!user}
                                        Component={ResetPassword}
                                    />
                                    <ProtectedRoute
                                        path={PATHS.ACCOUNT}
                                        condition={user}
                                        user={user}
                                        Component={Account}
                                    />
                                    <DonateRoute
                                        path={`${PATHS.DONATE}/:doneeId`}
                                        condition={user}
                                        user={user}
                                        donees={donees}
                                        Component={Payment}
                                    />
                                    <ProtectedRoute
                                        path={PATHS.DONATIONS}
                                        condition={user}
                                        user={user}
                                        Component={Donations}
                                    />
                                </Switch>
                            )}
                        </UserContext.Consumer>
                    </UserProvider>
                </OnlineProvider>
            </ThemeProvider>
        </Dialog>
    </InstallPromptProvider>
)

export default App

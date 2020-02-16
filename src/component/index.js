import React from 'react'
import '../styles/App.css'
import { Switch, Route } from 'react-router-dom'
import Home from './page/Home'
// import ResetPassword from './page/ResetPassword'
// import Login from './page/Login'
// import Account from './page/Account'
// import Orders from './page/Orders'
// import Feedback from './page/Feedback'
// import Payment from './page/Payment'
// import ProtectedRoute from './routing/ProtectedRoute'
// import UserManagementRoute from './routing/UserManagementRoute'
import ThemeProvider from './provider/ThemeProvider'
import UserProvider, { UserContext } from './provider/UserProvider'
import { PATHS } from '../utils/constants'
import OnlineProvider from './provider/OnlineProvider'
import InstallPromptProvider, { InstallPromptConsumer } from './provider/InstallPromptProvider'
import Dialog from './dialog'

const App = () => (
    <InstallPromptProvider>
        <InstallPromptConsumer>
            {addToHomeScreen => (
                <Dialog addToHomeScreen={addToHomeScreen}>
                    <ThemeProvider>
                        <OnlineProvider>
                            <UserProvider>
                                <UserContext.Consumer>
                                    {({ user }) => (
                                        <Switch>
                                            <Route exact path={PATHS.HOME}>
                                                <Home />
                                            </Route>
                                            {/* <Route exact path={PATHS.LOGIN}>
                                                <Login user={user} />
                                            </Route>
                                            <Route exact path={PATHS.SIGN_UP}>
                                                <Login user={user} />
                                            </Route>
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
                                            <ProtectedRoute
                                                path={`${PATHS.BUY}/:productName`}
                                                condition={user}
                                                user={user}
                                                products={[ { name: 'exampleProduct', price: 500 } ]}
                                                Component={Payment}
                                            />
                                            <ProtectedRoute
                                                path={PATHS.FEEDBACK}
                                                condition={user}
                                                user={user}
                                                Component={Feedback}
                                            />
                                            <ProtectedRoute
                                                path={PATHS.ORDERS}
                                                condition={user}
                                                user={user}
                                                orders={[{ id: '7asdf8asd', productName: "exampleOrder", datePurchased: Date.now(), charges: [ { name: "exampleOrder", price: 500 } ] }]}
                                                Component={Orders}
                                            /> */}
                                        </Switch>
                                    )}
                                </UserContext.Consumer>
                            </UserProvider>
                        </OnlineProvider>
                    </ThemeProvider>
                </Dialog>
            )}
        </InstallPromptConsumer>
    </InstallPromptProvider>
)

export default App

import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { signInWithGoogle, signIn, signUp, signInWithFacebook, performanceMonitor, MAX_ATTRIBUTE_VALUE_LENGTH, analytics } from '../../firebase'
import Form from '../form'
import '../../styles/Login.css'
import { EmailField, PasswordField } from '../form/input'
import SocialAuthButton from '../authentication/SocialAuthButton'
import { useLocation } from 'react-router-dom'
import { PATHS, DIALOG } from '../../utils/constants'
import { formatAuthErrorMessage } from '../../utils/errorMessages'
import { isInStandaloneMode, isIOS } from '../../utils/browser'
import { DialogConsumer } from '../dialog'
import { InstallPromptConsumer } from '../provider/InstallPromptProvider'
import { NOTIFICATION_PERMISSION_STATUS } from '../../utils/constants'
import Page from '.'

const SignInAndSignUp = ({ newUser, showDialog, addToHomeScreen }) => {
    const [ authErrorMessage, setAuthErrorMessage ] = useState('')
    const [ isLoading, setIsLoading ] = useState(false)
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const authTrace = performanceMonitor.trace('auth')

    const handleUser = (type) => {
        authTrace.putAttribute('result', 'success')
        analytics.logEvent(type === 'emailSignUp' ? 'sign_up' : 'login', {
            method: type
        })
        setAuthErrorMessage('')
        const notInstalled = !isInStandaloneMode()
        const showIOSInstallPrompt = isIOS() && notInstalled
        const showAndroidInstallPrompt = window.BeforeInstallPromptEvent && notInstalled && addToHomeScreen

        if (!localStorage.getItem('installation_requested')) {
            if (showIOSInstallPrompt) {
                showDialog(DIALOG.IOS_INSTALL)
            } else if (showAndroidInstallPrompt) {
                showDialog(DIALOG.ANDROID_INSTALL)
            }
        } else if (Notification.permission === NOTIFICATION_PERMISSION_STATUS.DEFAULT) {
            showDialog(DIALOG.NOTIFICATION_PERMISSION)
        }
    }

    const handleAuthError = error => {
        authTrace.putAttribute('result', 'fail')
        const errorMessage = formatAuthErrorMessage(error)
        authTrace.putAttribute('errorMessage', errorMessage.slice(0, MAX_ATTRIBUTE_VALUE_LENGTH))
        setIsLoading(false)
        setAuthErrorMessage(errorMessage)
    }

    const handleAuth = (authProvider, type) => {
        authTrace.start()
        authTrace.putAttribute('type', type)
        setIsLoading(true)
        authProvider()
            .then(() => handleUser(type))
            .catch(handleAuthError)
            .finally(() => authTrace.stop())
    }

    const genericAuth = () => {
        authTrace.putAttribute('method', 'email')
        newUser
            ? handleAuth(() => signUp(email, password), 'emailSignUp')
            : handleAuth(() => signIn(email, password), 'emailSignIn')
    }

    return (
        <Page pageClassName="Login">
            <h2>{newUser? 'Sign Up' : 'Sign In'}</h2>
            <SocialAuthButton name="google" onClick={() => handleAuth(signInWithGoogle, 'google')} newUser={newUser} />
            <SocialAuthButton name="facebook" onClick={() => handleAuth(signInWithFacebook, 'facebook')} newUser={newUser} />
            <Form
                onSubmit={genericAuth}
                submitValue={newUser ? 'Sign Up' : 'Sign In'}
                submittingValue={'Signing In...'}
                submitting={isLoading}
                errorMessage={authErrorMessage}
            >
                <EmailField valueHook={setEmail} />
                <PasswordField valueHook={setPassword} />
            </Form>
            <p className='login-links'>
                {newUser
                    ? <span>Already have an account? <Link to={{pathname: PATHS.LOGIN, state: { newUser: false }}}>Sign In</Link></span>
                    : <>
                        <span>Don't have an account? <Link to={{pathname: PATHS.SIGN_UP, state: { newUser: true }}}>Sign Up</Link></span>
                        <Link to={PATHS.RESET_PASSWORD}>Forgot Your Password?</Link>
                      </>}
            </p>
        </Page>
    )
}

const Login = ({ user }) => {
    const location = useLocation()
    const pathOnSignIn = (location.state && location.state.pathOnSignIn) ? location.state.pathOnSignIn : PATHS.HOME

    return user
        ? <Redirect to={pathOnSignIn} />
        : (
            <DialogConsumer>
                {({ showDialog }) => (
                    <InstallPromptConsumer>
                        {addToHomeScreen => (
                            <SignInAndSignUp
                                newUser={location.state ? location.state.newUser : location.pathname === PATHS.SIGN_UP}
                                showDialog={showDialog}
                                addToHomeScreen={addToHomeScreen}
                            />
                        )}
                    </InstallPromptConsumer>
                )}
            </DialogConsumer>
        )
}

export default Login
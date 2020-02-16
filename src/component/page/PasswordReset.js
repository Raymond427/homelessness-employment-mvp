import React, { useState, useEffect } from 'react'
import { verifyPasswordResetCode, handlePasswordReset, performanceMonitor, MAX_ATTRIBUTE_VALUE_LENGTH } from '../../firebase'
import Form from '../form'
import { PasswordField } from '../form/input'
import { Redirect, withRouter } from 'react-router-dom'
import { PATHS } from '../../utils/constants'
import Page from '.'

const PasswordReset = withRouter(({ searchParams, history }) => {
    const [ verifyingActionCode, setVerifyingActionCode ] = useState(true)
    const [ email, setEmail ] = useState(false)
    const [ actionCodeVerified, setActionCodeVerified ] = useState(false)
    const [ passwordReset, setPasswordReset ] = useState(false)
    const [ submittonError, setSubmissionError ] = useState('')
    const [ isResettingPassword, setIsResettingPassword ] = useState(false)

    const actionCode = searchParams.get('oobCode')

    if (!actionCode) {
        return <Redirect to={PATHS.HOME} />
    }

    useEffect(() => {
        const verifyPasswordResetCodeTrace = performanceMonitor.trace('verifyPasswordResetCode')
        const actionCodePromise = () => {
            verifyPasswordResetCode(actionCode)
                .then(email => {
                    verifyPasswordResetCodeTrace.putAttribute('result', 'success')
                    setEmail(email)
                    setActionCodeVerified(true)
                }).catch(() => {
                    verifyPasswordResetCodeTrace.putAttribute('result', 'fail')
                    setActionCodeVerified(false)
                }).finally(() => {
                    verifyPasswordResetCodeTrace.stop()
                    setVerifyingActionCode(false)
                })
        }
        
        verifyPasswordResetCodeTrace.start()
        actionCodePromise()
    }, [])

    const resetPassword = (actionCode, newPassword) => {
        setIsResettingPassword(true)
        const resettingPasswordTrace = performanceMonitor.trace('resettingPassword')
        handlePasswordReset(actionCode, newPassword)
            .then(() => {
                resettingPasswordTrace.putAttribute('result', 'success')
                setPasswordReset(true)
            })
            .catch(({ message }) => {
                resettingPasswordTrace.putAttribute('result', 'fail')
                resettingPasswordTrace.putAttribute('errorMessage', message.slice(0, MAX_ATTRIBUTE_VALUE_LENGTH))
                setSubmissionError(message)
            })
            .finally(() => {
                resettingPasswordTrace.stop()
                setIsResettingPassword(false)
            })
    }

    const PageContents = () => {
        const [ newPassword, setNewPassword ] = useState('')

        if (verifyingActionCode) {
            return (
                    <h2>Verifying Password Reset Link...</h2>
            )
        }
        if (!actionCodeVerified) {
            return (
                <>
                    <h2>Looks like your password reset link has expired</h2>
                    <button
                        className="button"
                        onClick={event => {
                            event.preventDefault()
                            history.push(PATHS.RESET_PASSWORD)
                        }}
                    >
                        Get Another Link
                    </button>
                </>
            )
        } else {
            return passwordReset
            ?   (
                    <>
                        <h2>Your password has been reset!</h2>
                        <button
                            className="button"
                            onClick={event => {
                                event.preventDefault()
                                history.push(PATHS.LOGIN)
                            }}
                        >
                            Log In
                        </button>
                    </>
                )
            :   <>
                    <h2>Reset Password for {email}</h2>
                    <Form
                        submitValue="Reset Password"
                        onSubmit={() => resetPassword(actionCode, newPassword)}
                        submitting={isResettingPassword}
                        submittingValue="Resetting your password..."
                        errorMessage={submittonError}
                    >
                        <PasswordField valueHook={setNewPassword} />
                    </Form>
                </>
        }
    }

    return (
        <Page pageClassName="PasswordReset" hideBack>
            <PageContents />
        </Page>
    )
})

export default PasswordReset
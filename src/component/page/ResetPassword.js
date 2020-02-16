import React, { useState } from 'react'
import { sendPasswordResetEmail, performanceMonitor, MAX_ATTRIBUTE_VALUE_LENGTH } from '../../firebase'
import Form from '../form'
import { EmailField } from '../form/input'
import Page from '.'

const ResetPassword = () => {
        const [ email, setEmail ] = useState('')
        const [ passwordResetEmailSent, setPasswordResetEmailSent ] = useState(false)
        const [ submittonError, setSubmissionError ] = useState('')
        const [ isLoading, setIsLoading ] = useState(false)

        const handlePasswordReset = emailAddress => {
            const passwordResetEmailTrace = performanceMonitor.trace('sendPasswordResetEmail')
            passwordResetEmailTrace.start()
            setIsLoading(true)
            sendPasswordResetEmail(emailAddress)
                .then(() => {
                    passwordResetEmailTrace.putAttribute('result', 'success')
                    setPasswordResetEmailSent(true)
                })
                .catch(({ message }) => {
                    passwordResetEmailTrace.putAttribute('result', 'fail')
                    passwordResetEmailTrace.putAttribute('errorMessage', message.slice(0, MAX_ATTRIBUTE_VALUE_LENGTH))
                    setSubmissionError(message)
                })
                .finally(() => {
                    passwordResetEmailTrace.stop()
                    setIsLoading(false)
                })
        }

        return (
            <Page pageClassName="ResetPassword">
                {passwordResetEmailSent
                ?   <h2>Open the link we sent to {email} to reset your password</h2>
                :   <>
                        <h2>Enter your email to reset your password</h2>
                        <Form
                            submitValue="Reset Password"
                            onSubmit={() => handlePasswordReset(email)}
                            submitting={isLoading}
                            submittingValue="Sending Your Reset Email..."
                            errorMessage={submittonError}
                        >
                            <EmailField valueHook={setEmail} />
                        </Form>
                    </>
                }
            </Page>
        )
    }

export default ResetPassword
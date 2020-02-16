export const formatAuthErrorMessage = ({ code, message }) => {
    switch(code) {
        case 'auth/popup-closed-by-user':
            return "The popup to login has been closed, try signing in again"
        case 'auth/user-not-found':
            return "We can't find a user with this email, try signing up instead"
        case 'auth/invalid-user-token':
            return 'Try siging in again, sorry about that!'
        case 'auth/network-request-failed':
            return "We're having some trouble connecting to the internet, check that your connection is good then try again"
        case 'auth/too-many-requests':
            return "We're pretty busy right now, please wait a minute and try logging in again! Sorry about the inconvenience"
        case 'auth/user-disabled':
            return "We've disabled your account"
        case 'auth/user-token-expired':
            return "Looks like there's been a mixup, try signing in again, sorry about that!"
        case 'auth/web-storage-unsupported':
            return "You can't log in because your device doesn't support web storage, try logging in on a different device"
        case 'auth/account-exists-with-different-credential':
            return "It looks like you made this account using another sign in method, try one of our other sign in methods or sign up with the same email using a password"
        default:
            return message
    }
}

export const formatPaymentErrorMessage = ({ code, raw }) => {
    if (!code) {
        return "We're having some trouble connecting to the internet, check that your connection is good then try again"
    }

    switch(code) {
        case 'card_declined':
            return "The card was declined, please try again or contact your bank"
        case 'expired_card':
            return "The card is expired, please try again or contact your bank"
        default:
            return raw.message
    }
}

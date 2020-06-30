export const COMPANY_EMAIL = 'thepivotfund@gmail.com'

export const PATHS = {
    HOME: '/',
    LOGIN: '/login',
    SIGN_UP: '/sign-up',
    USER_MANAGEMENT: '/usermgmt',
    RESET_PASSWORD: '/reset-password',
    ACCOUNT: '/account',
    DONATE: '/donate',
    FEEDBACK: '/feedback',
    DONATIONS: '/donations',
    EMAIL: `mailto:${COMPANY_EMAIL}`,
    PROFILE: `/profile`
}

export const PAGE_TITLES = {
    '/': 'Home',
    '/login': 'Log In',
    '/sign-up': 'Sign In',
    '/about-us': 'About Us',
    '/usermgmt': 'User Management',
    '/reset-password': 'Reset Password',
    '/account': 'Account',
    '/donate': 'Donate',
    '/feedback': 'Feedback',
    '/donations': 'Donations'
}

export const THEMES = {
    DARK: 'dark',
    LIGHT: 'light'
}

export const NOTIFICATION_PERMISSION_STATUS = {
    GRANTED: 'granted',
    DENIED: 'denied',
    DEFAULT: 'default'
}

export const DIALOG = {
    IOS_INSTALL: 'ios-install',
    ANDROID_INSTALL: 'android-install',
    NOTIFICATION_PERMISSION: 'notification_permission',
    UPDATE_AVAILABLE: 'update_available',
    SHARE: 'share'
}

export const BASE_URL = 'https://pivotfund.org'

export const FULL_URL = path => `${BASE_URL}${path}`
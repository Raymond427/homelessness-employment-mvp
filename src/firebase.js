import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/performance'
import 'firebase/analytics'
import 'firebase/messaging'

const config = {
    apiKey: '',
    authDomain: 'example.firebaseapp.com',
    databaseURL: 'https://example.firebaseio.com',
    projectId: 'example',
    storageBucket: 'example.appspot.com',
    messagingSenderId: '',
    appId: '',
    measurementId: ''
}

firebase.initializeApp(config)

export const performanceMonitor = firebase.performance()
export const MAX_ATTRIBUTE_VALUE_LENGTH = 40
export const analytics = firebase.analytics()

export const CLOUD_MESSAGING_IDENTITY_KEY = ''

export const messaging = firebase.messaging()

messaging.usePublicVapidKey(CLOUD_MESSAGING_IDENTITY_KEY)

messaging.onTokenRefresh(() => {
    const currentToken = sessionStorage.getItem('fcmToken')
    messaging.deleteToken(currentToken)
    messaging.getToken()
        .then(token => sessionStorage.setItem('fcmToken', token))
})

export const requestNotificationPermission = () => (
    messaging.requestPermission()
        .then(() => {
            messaging.getToken().then(token => sessionStorage.setItem('fcmToken', token))
            analytics.logEvent('notification_permission', { accepted: true })
        })
        .catch(() => analytics.logEvent('notification_permission', { accepted: false }))
)

export const auth = firebase.auth()
export const signInWithGoogle = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider()
    return auth.signInWithPopup(googleProvider)
}

export const signInWithFacebook = () => {
    const facebookProvider = new firebase.auth.FacebookAuthProvider()
    return auth.signInWithPopup(facebookProvider).then(({ user }) => ({ user: { ...user } }))
}

export const signUp = (email, password) => auth.createUserWithEmailAndPassword(email, password)
export const signIn = (email, password) => auth.signInWithEmailAndPassword(email, password)

export const sendPasswordResetEmail = emailAddress => auth.sendPasswordResetEmail(emailAddress)
export const verifyPasswordResetCode = actionCode => auth.verifyPasswordResetCode(actionCode)
export const handlePasswordReset = (actionCode, newPassword) => auth.confirmPasswordReset(actionCode, newPassword)

const firestore = firebase.firestore()
firestore.settings({})
firestore.enablePersistence()
export const postFeedback = feedback => firestore.collection('/feedback').add(feedback)
export const getOrders = uid => firestore.collection('/orders').where('userId', '==', uid).orderBy('datePurchased', 'desc').get()
export const orderSubscription = uid => firestore.collection('/orders').where('userId', '==', uid).orderBy('datePurchased', 'desc')
export const postOrder = order => firestore.collection('/orders').add(order)

export default firebase
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/performance'
import 'firebase/analytics'
import 'firebase/messaging'
import 'firebase/functions'

const config = {
    apiKey: "AIzaSyAd2mbu45Di7BaeSzUVc_vN3RArc8ZKaYo",
    authDomain: "homelessness-employment.firebaseapp.com",
    databaseURL: "https://homelessness-employment.firebaseio.com",
    projectId: "homelessness-employment",
    storageBucket: "homelessness-employment.appspot.com",
    messagingSenderId: "471265847473",
    appId: "1:471265847473:web:63c7490b870b3f89651a90",
    measurementId: "G-8Y77RTCQ59"
}

firebase.initializeApp(config)

export const performanceMonitor = firebase.performance()
export const MAX_ATTRIBUTE_VALUE_LENGTH = 40
export const analytics = firebase.analytics()

export const CLOUD_MESSAGING_IDENTITY_KEY = ''

export let messaging, requestNotificationPermission

export const notificationsSupported = firebase.messaging.isSupported

if (notificationsSupported()) {
    messaging = firebase.messaging()

    // messaging.usePublicVapidKey(CLOUD_MESSAGING_IDENTITY_KEY)
    
    messaging.onTokenRefresh(() => {
        const currentToken = sessionStorage.getItem('fcmToken')
        messaging.deleteToken(currentToken)
        messaging.getToken()
            .then(token => sessionStorage.setItem('fcmToken', token))
    })

    messaging.onMessage((payload) => {
        console.log('Message received. ', payload);
    })
    
    requestNotificationPermission = () => (
        messaging.requestPermission()
            .then(() => {
                messaging.getToken().then(token => sessionStorage.setItem('fcmToken', token))
                analytics.logEvent('notification_permission', { accepted: true })
            })
            .catch(() => analytics.logEvent('notification_permission', { accepted: false }))
    )
}

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
export const getDonations = uid => firestore.collection('/donations').where('donorId', '==', uid).orderBy('datePurchased', 'desc').get()
export const DonationSubscription = uid => firestore.collection('/donations').where('donorId', '==', uid).orderBy('datePurchased', 'desc')

export default firebase
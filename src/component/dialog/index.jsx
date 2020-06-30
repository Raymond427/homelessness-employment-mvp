import React, { useState, useEffect, createRef, useContext } from 'react'
import dialogPolyfill from 'dialog-polyfill'
import '../../styles/Dialog.css'
import { DIALOG, NOTIFICATION_PERMISSION_STATUS } from '../../utils/constants'
import IOSInstallDialog from './IOSInstallDialog'
import AndroidInstallDialog from './AndroidInstallDialog'
import NotificationDialog from './NotificationDialog'
import UpdateDialog from './UpdateDialog'
import ShareDialog from './ShareDialog'
import { InstallPromptContext } from '../provider/InstallPromptProvider'
import X from '../icon/X'
import notificationsSupported from '../../firebase'

export const DialogContext = React.createContext()

const DialogContent = ({ type, addToHomeScreen, onClose, dialogProps }) => {
    switch (type) {
        case DIALOG.IOS_INSTALL:
            return <IOSInstallDialog />
        case DIALOG.ANDROID_INSTALL:
            return <AndroidInstallDialog homeSreenPrompt={addToHomeScreen} onClose={onClose} />
        case DIALOG.NOTIFICATION_PERMISSION:
            return <NotificationDialog onClose={onClose} />
        case DIALOG.UPDATE_AVAILABLE:
            return <UpdateDialog onClose={onClose} />
        case DIALOG.SHARE:
            return <ShareDialog onClose={onClose} {...dialogProps} />
        default:
    }
}

const Dialog = ({ children }) => {
    const [ showing, setShowing ] = useState(false)
    const [ type, setType ] = useState('')
    const [ dialogProps, setDialogProps ] = useState(null)
    const dialogRef = createRef()
    const { addToHomeScreen } = useContext(InstallPromptContext)

    const closeDialog = () => {
        if (dialogRef.current) {
            dialogRef.current.close()
        }
        setShowing(false)
    }

    const showDialog = (dialogContentType, dialogProps) => {
        setType(dialogContentType)
        setDialogProps(dialogProps)
        setShowing(true)
    }

    const onClose = () => {
        if (type !== DIALOG.IOS_INSTALL && type !== DIALOG.ANDROID_INSTALL) {
            closeDialog()
            return
        }
        if (type === DIALOG.IOS_INSTALL) {
            localStorage.setItem('installation_requested', 'true')
        }
        const showNotificationDialog = notificationsSupported() && Notification.permission === NOTIFICATION_PERMISSION_STATUS.DEFAULT && (type === DIALOG.IOS_INSTALL || type === DIALOG.ANDROID_INSTALL)
        showNotificationDialog ? showDialog(DIALOG.NOTIFICATION_PERMISSION) : closeDialog()
    }

    const closeIfEscapeKeyIsPressed = e => {
        if(e.keyCode === 27) {  // if ESC key is pressed
            onClose()
        }
    }

    const openUpdateAvailableDialog = e => {
        if (e.data === 'serviceWorkerUpdateAvailable') {
            showDialog(DIALOG.UPDATE_AVAILABLE)
        }
    }

    useEffect(() => {
        window.addEventListener('message', openUpdateAvailableDialog)
        document.addEventListener('keydown', closeIfEscapeKeyIsPressed)
        return () => {
            window.removeEventListener('message', openUpdateAvailableDialog)
            document.removeEventListener('keydown', closeIfEscapeKeyIsPressed)
        }
    }, [])

    useEffect(() => {
        if (showing) {
            dialogPolyfill.registerDialog(dialogRef.current)
            dialogRef.current.showModal()
        }
    }, [ showing ])

    return (
        <DialogContext.Provider value={{ showDialog }}>
            {showing && (
                <dialog ref={dialogRef}>
                    <button className="dialog-close-button" onClick={onClose}><X /></button>
                    <DialogContent type={type} addToHomeScreen={addToHomeScreen} onClose={onClose} dialogProps={dialogProps} />
                </dialog>
            )}
            {children}
        </DialogContext.Provider>
    )
}

export default Dialog
import React from 'react'
// import { requestNotificationPermission } from '../../firebase'
import { NOTIFICATION_PERMISSION_STATUS } from '../../utils/constants'

const NotificationDialog = ({ onClose }) => (
    <>
        <h3>Allow Notifications?</h3>
        <p>We'll notify you when new content is released!</p>
        <footer className="dialog-footer">
            <button
                className="dialog-primary-button"
                onClick={() => {
                    if (Notification.permission === NOTIFICATION_PERMISSION_STATUS.DEFAULT) {
                        // requestNotificationPermission()
                    }
                    onClose()
                }}
            >
                Sure!
            </button>
            <button onClick={onClose}>No Thanks</button>
        </footer>
    </>
)

export default NotificationDialog
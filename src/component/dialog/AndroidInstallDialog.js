import React from 'react'

const AndroidInstallDialog = ({ homeSreenPrompt, onClose }) => (
    <>
        <h3>Did you know?</h3>
        <p>You can install this website just like a mobile app to access it easier later!</p>
        <footer className="dialog-footer">
            <button className="dialog-primary-button"
                onClick={() => {
                    homeSreenPrompt.addToHomeScreen()
                    localStorage.setItem('installation_requested', 'true')
                    onClose()
                }}
            >
                Sure!
            </button>
            <button onClick={onClose}>No Thanks</button>
        </footer>
    </>
)

export default AndroidInstallDialog
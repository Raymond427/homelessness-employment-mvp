import React from 'react'
import '../styles/Button.css'

const primaryStyle = {
    color: '#102B3F',
    backgroundColor: '#E2CFEA'
}

const secondaryStyle = {
    color: '#E2CFEA',
    backgroundColor: '#102B3F',
    border: '#E2CFEA solid 0.1rem'
}

const Button = ({ secondary, children, style, ...rest }) => {
    const additionalStyles = secondary ? secondaryStyle : primaryStyle

    return (
        <button className="button" {...rest} style={{...style, ...additionalStyles}}>
            {children}
        </button>
    )
}

export default Button
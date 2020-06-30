import React from 'react'
import '../styles/Card.css'

const Card = ({ title, subTitle, style, children, className }) => (
    <div className={`Card${className ? ` ${className}` : ''}`} style={style}>
        {title && <h2>{title}</h2>}
        {subTitle && <h3>{subTitle}</h3>}
        {children}
    </div>
)

export const NarrowCard = ({ children, ...rest }) => (
    <Card style={{ maxWidth: '23rem', marginLeft: 'auto', marginRight: 'auto' }} {...rest}>
        {children}
    </Card>
)

export default Card
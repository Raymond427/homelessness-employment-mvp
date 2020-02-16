import React from 'react'

export default ({ className, color = "var(--primary-text-color)", left = false }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`arrow-icon ${className}`} xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100" version="1.1" height="40" width="40" xmlSpace="preserve" style={{cursor: 'pointer'}}>
        <g>
            <polygon transform={`${left ? 'translate(100, 0)' : ''} scale(${left ? '-' : ''}1, 1)`} fill={color} points="35.908,79.358 68.21,52.906 64.092,47.877 64.083,47.884 41.697,20.642 36.675,24.768 59.055,52.002 31.79,74.329"/>
        </g>
    </svg>
)
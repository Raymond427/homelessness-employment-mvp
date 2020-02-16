import React from 'react'

export default ({ className, id, highlight, highlightColor }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} id={id} style={{fill: highlight ? highlightColor : 'var(--secondary-background-color)', width: '30px', height: '30px'}}>
        <path d="M29.75,12.53a1,1,0,0,0-.81-.68l-8.32-1.21L16.9,3.1a1,1,0,0,0-1.8,0l-3.72,7.54L3.06,11.85a1,1,0,0,0-.56,1.71l6,5.87L7.1,27.72a1,1,0,0,0,1.46,1.05L16,24.86l7.44,3.91a1,1,0,0,0,.47.12,1.06,1.06,0,0,0,.59-.19,1,1,0,0,0,.4-1l-1.43-8.29,6-5.87A1,1,0,0,0,29.75,12.53Z"/>
    </svg>
)
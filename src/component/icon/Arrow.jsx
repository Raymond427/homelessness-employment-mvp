import React from 'react'

export default ({ className, color = "var(--primary-text-color)", left = false }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`arrow-icon ${className}`} xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 40 40" version="1.1" height="40" width="40" xmlSpace="preserve" style={{cursor: 'pointer', transform: `${left ? 'translate(0, 0)' : ''} scale(${left ? '-' : ''}1, 1)`}} transform={`${left ? 'translate(0, 0)' : ''} scale(${left ? '-' : ''}1, 1)`}>
<path style={{fill:'#FFFFFF', transform: "translate(8px, 8px) scale(0.8, 0.8)"}} d="M21.205,5.007c-0.429-0.444-1.143-0.444-1.587,0c-0.429,0.429-0.429,1.143,0,1.571l8.047,8.047H1.111
	C0.492,14.626,0,15.118,0,15.737c0,0.619,0.492,1.127,1.111,1.127h26.554l-8.047,8.032c-0.429,0.444-0.429,1.159,0,1.587
	c0.444,0.444,1.159,0.444,1.587,0l9.952-9.952c0.444-0.429,0.444-1.143,0-1.571L21.205,5.007z"/>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
</svg>
)
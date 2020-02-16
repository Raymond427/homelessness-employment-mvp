import React from 'react'

const Picture = ({ className, images, alt = "" }) => (
    <picture className={className}>
        {images.length > 1 && images.map(({ src, maxWidth }) => (
            <source key={src} srcSet={require(`../images/${src}`)} media={maxWidth ? `(max-width: ${maxWidth}px)` : ''}></source>
        ))}
        <img className={className} src={require(`../images/${images[images.length - 1].src}`)} alt={alt} />
    </picture>
)

export default Picture
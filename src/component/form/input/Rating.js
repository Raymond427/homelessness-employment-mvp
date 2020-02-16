import React, { useState, useEffect } from 'react'
import Star from '../../icon/Star'

const RatingInput = ({ id, showErrors, required, onBlur, onValid, onInValid, valueHook, maxValue = 5 }) => {
    const [ rating, setRating ] = useState(0)
    const isValid = () => required ? rating > 0 : true
    const buttonRefs = [ ...Array(maxValue).keys() ].map(() => React.createRef())

    const onRatingButtonClick = (value, idx) => event => {
        buttonRefs[idx].current.focus()
        event.preventDefault()
        setRating(value)
    }

    useEffect(() => valueHook(rating), [ rating ])
    
    useEffect(() => {
        valueHook(rating)
        isValid() ? onValid() : onInValid()
    }, [])

    return (
        <div id={id} className={`${showErrors ? `rating__wrapper--invalid rating__wrapper` : 'rating__wrapper'}`}>
            {[ ...Array(maxValue).keys() ].map(
                idx => {
                    const value = idx + 1

                    return (
                        <button className="rating-button" id={`rating__button-${value}-${id}`} key={`rating-button-${value}`} onClick={onRatingButtonClick(value, idx)} onBlur={() => onBlur(isValid())} ref={buttonRefs[idx]}>
                            <Star className="rating__input-star" id={`rating__input-star-${value}-${id}`} highlight={value <= rating} highlightColor={'yellow'} />
                        </button>
                    )
                }
            )}
        </div>
    )
}

export default RatingInput
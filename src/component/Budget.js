import React from 'react'
import { usdFormat, totalPrice } from '../utils'
import '../styles/Budget.css'

const Budget = ({ budget }) => {
    const total = totalPrice(budget)

    return (
        <div className="budget">
            {budget.map(({ name, price }) =>
                <div key={`${name}-${price}`} className="budget-item">
                    <span className="budget-item-name">{name}</span>
                    <span className="budget-item-price">{usdFormat(price)}</span>
                </div>
            )}
            <div className="budget-item budget-total">
                <span className="budget-item-total">Total</span>
                <span className="budget-item-total-price">{usdFormat(total)}</span>
            </div>
        </div>
    )
}

export default Budget
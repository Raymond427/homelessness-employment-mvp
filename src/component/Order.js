import React from 'react'
import '../styles/Order.css'
import { usdFormat, totalPrice, formatDate, capitalize } from '../utils'

const Order = ({ id, productName, datePurchased, charges }) => (
    <div className="Order">
        <p>{capitalize(productName)}</p>
        {id && <p>{`Order ID: ${id}`}</p>}
        {datePurchased && <p>{formatDate(datePurchased)}</p>}
        <div className="charges-container">
            {charges.map(({ name, price }, idx) =>
                <div className="item" key={`${name}-${idx}`}>
                    <span>{name}</span>
                    <span>{usdFormat(price)}</span>
                </div>
            )}
            <div className="item">
                <span>Total:</span>
                <span>{usdFormat(totalPrice(charges))}</span>
            </div>
        </div>
    </div>
)

export default Order
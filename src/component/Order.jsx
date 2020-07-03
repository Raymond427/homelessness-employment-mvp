import React from 'react'
import '../styles/Order.css'
import { NarrowCard } from './Card'
import { usdFormat, totalPrice, formatDate } from '../utils'

const Order = ({ id, doneeName, dateCreated, charges, backgroundColor }) => (
    <NarrowCard className="Order" style={{ backgroundColor }}>
        <h3>{doneeName}</h3>
        {dateCreated && <p>{formatDate(dateCreated)}</p>}
        {id && <p>{`ID: ${id}`}</p>}
        <div className="charges-container">
            {charges.map(({ name, price }, idx) =>
                <div className="item" key={`${name}-${idx}`}>
                    <span>{name}</span>
                    <span>{usdFormat(price || 0)}</span>
                </div>
            )}
            <div className="item">
                <span>Total:</span>
                <span>{usdFormat(totalPrice(charges))}</span>
            </div>
        </div>
    </NarrowCard>
)

export default Order
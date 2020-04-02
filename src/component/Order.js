import React from 'react'
import '../styles/Order.css'
import { NarrowCard } from '../component/Card'
import { usdFormat, totalPrice, formatDate, capitalize } from '../utils'

const Order = ({ id, doneeName, dateCreated, charges, backgroundColor }) => (
    <NarrowCard className="Order" style={{ backgroundColor }}>
        <h3>{doneeName}</h3>
        {dateCreated && <p>{formatDate(dateCreated)}</p>}
        {id && <p>{`Order ID: ${id}`}</p>}
        <div className="charges-container">
            {charges.map(({ name, price }, idx) =>
                <div className="item" key={`${name}-${idx}`}>
                    <span>{name === "donation" ? 'Donation' : capitalize(name) }</span>
                    <span>{usdFormat(price)}</span>
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
import React from 'react'
import Order from '../Order'
import { capitalize } from '../../utils'
import { PATHS } from '../../utils/constants'
import Page from '.'

const Orders = ({ orders }) => (
    <Page pageClassName="Orders">
        <h2>Orders</h2>
        <p>Have a question about an order?</p>
        <a href={PATHS.EMAIL_US} target="_blank" rel="noopener noreferrer">
            Contact Us
        </a>
        <div className="orders">
            {orders.map(({ id, productName, datePurchased, charges }) => (
                <Order key={id} id={id} productName={productName} datePurchased={datePurchased} charges={[ { name: capitalize(productName), price: charges.product }, { name: 'Processing', price: charges.processing } ]} />)
            )}
        </div>
    </Page>
)

export default Orders
import React from 'react'
import { capitalize } from '../utils'
import '../styles/PlanProgress.css'

export default ({ plan }) => (
    <div className="plan">
        <div className="plan-descriptions">
            {plan.steps.map((step, idx) =>
                <div className="plan-step" style={{ width: `calc(100% / ${plan.steps.length})`}} key={step}>
                    <div className="plan-step-circle" style={{ backgroundColor: `${idx <= plan.status ? '#6247AA' : '#FFFFFF'}`}}></div>
                    {(idx < plan.steps.length - 1) && <div className="plan-step-bridge" style={{ backgroundColor: `${idx < plan.status ? '#6247AA' : '#FFFFFF'}`}}></div>}
                    <div className="plan-step-description">
                        {capitalize(step)}
                    </div>
                </div>
            )}
        </div>
    </div>
)
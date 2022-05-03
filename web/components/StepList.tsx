import React from 'react'

import type { Step } from '../api/Types'

interface StepListProps {
    steps: Step[]
}

const StepList: React.VFC<StepListProps> = ({ steps }) => {
    return (
        <>
            <h2 className="font-playfair text-2xl py-4">Instructies</h2>
            <ul>
                {steps.map((step) => (
                    <li className="py-1" key={step._id}>
                        {step.instruction}
                    </li>
                ))}
            </ul>
        </>
    )
}

export default StepList

import React from "react"
import { Step } from "../api/Types"

interface StepListProps {
    steps: Step[];
}

const StepList: React.VFC<StepListProps> = ({steps}) => {
    return (
        <>
            <h2>Instructies</h2>
            <ul>
                {
                    steps.map((step, i: number) => <li key={i}>{step.instruction}</li>)
                }
            </ul>
        </>
    )
};

export default StepList;
import React from 'react'

import type { Ingredient } from '../api/Types'

interface IngredientListProps {
    ingredients: Ingredient[]
}

const IngredientList: React.VFC<IngredientListProps> = ({ ingredients }) => {
    return (
        <>
            <h2>Ingredienten</h2>
            <ul>
                {ingredients.map((ingredient, i: number) => (
                    <li key={i}>
                        {`${ingredient.amount} ${ingredient.unit} ${ingredient.product}`}
                        {` `}
                        {ingredient.note && `(${ingredient.note})`}
                    </li>
                ))}
            </ul>
        </>
    )
}

export default IngredientList

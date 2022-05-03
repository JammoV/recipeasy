import React from 'react'

import type { Ingredient } from '../api/Types'

interface IngredientListProps {
    ingredients: Ingredient[]
}

const IngredientList: React.VFC<IngredientListProps> = ({ ingredients }) => {
    return (
        <>
            <h2 className="font-playfair text-2xl py-4">Ingredienten</h2>
            <ul>
                {ingredients.map((ingredient) => (
                    <li className="py-1" key={ingredient._id}>
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

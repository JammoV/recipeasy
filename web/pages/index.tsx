import groq from 'groq'
import type { GetStaticProps } from 'next'
import Link from 'next/link'
import React from 'react'

import type { Recipe } from '../api/Types'
import client from '../client'

const Index: React.FC<{ recipes: Recipe[] }> = ({ recipes }) => {
    return (
        <div>
            <ul>
                {recipes.length > 0 &&
                    recipes.map(
                        ({ _id, title = '', slug, publishedAt = '' }) =>
                            slug && (
                                <li key={_id}>
                                    <Link
                                        href="/recipe/[slug]"
                                        as={`/recipe/${slug.current}`}
                                    >
                                        {title}
                                    </Link>{' '}
                                    ({new Date(publishedAt).toDateString()})
                                </li>
                            )
                    )}
            </ul>
        </div>
    )
}

interface ResultData {
    recipes: Recipe[]
}

export const getStaticProps: GetStaticProps<ResultData> = async () => {
    const recipes = await client.fetch(groq`
      *[_type == "recipe" && publishedAt < now()] | order(publishedAt desc)
    `)
    return {
        props: {
            recipes,
        },
    }
}

export default Index

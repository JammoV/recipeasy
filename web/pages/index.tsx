import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'
import React from "react";
import { Recipe } from '../api/Types';
import Link from 'next/link'
import groq from 'groq'
import client from '../client'

const Index: React.FC<{ recipes: Recipe[] }> = ({recipes}) => {
    return (
        <div>
            <ul>
            {recipes.length > 0 && recipes.map(
                ({ _id, title = '', slug, publishedAt = '' }) =>
                    slug && (
                        <li key={_id}>
                            <Link href="/recipe/[slug]" as={`/recipe/${slug.current}`}>
                                <a>{title}</a>
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
    recipes: Recipe[];
}

export const getStaticProps: GetStaticProps<ResultData> = async (context) => {
    const recipes = await client.fetch(groq`
      *[_type == "recipe" && publishedAt < now()] | order(publishedAt desc)
    `)
    return {
        props: {
            recipes
        }
    }
}


export default Index
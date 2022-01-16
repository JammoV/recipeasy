import { Box } from '@mui/material'
import imageUrlBuilder from '@sanity/image-url'
import groq from 'groq'
import type { GetStaticProps } from 'next'
import Link from 'next/link'
import React, { useState } from 'react'

// import BlockContent from '@sanity/block-content-to-react'
import { GetRecipe } from '../../api/Queries'
import type { Recipe } from '../../api/Types'
import client from '../../client'
import IngredientList from '../../components/IngredientList'
import LiveInstructions from '../../components/LiveInstructions'
import StepList from '../../components/StepList'

function urlFor(source: string) {
    return imageUrlBuilder(client).image(source)
}

const RecipePost: React.FC<{ recipe: Recipe }> = ({ recipe }) => {
    const [liveInstructionsEnabled, setLiveInstructionsEnabled] =
        useState<boolean>(false)

    if (!recipe) return null

    const {
        title = 'Missing title',
        image,
        description,
        publishedAt,
        servings,
        cookTime,
        tags,
        ingredients,
        steps,
        source,
    } = recipe

    return (
        <article>
            <h1>{title}</h1>
            <p>Serves: {servings}</p>
            <p>Duratie: {cookTime} minuten</p>
            {description && <p>{description}</p>}
            <p>Gepubliseerd op: {new Date(publishedAt).toDateString()}</p>
            <img src={urlFor(image).width(300).url()} alt={title} />

            {tags && (
                <ul>
                    Tags
                    {tags.map((tag, i) => (
                        <li key={i}>{tag}</li>
                    ))}
                </ul>
            )}

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                }}
            >
                <Box
                    sx={{
                        minWidth: '300px',
                    }}
                >
                    {ingredients && (
                        <IngredientList ingredients={ingredients} />
                    )}
                </Box>
                <Box>{steps && <StepList steps={steps} />}</Box>
            </Box>
            <button
                onClick={() =>
                    setLiveInstructionsEnabled(!liveInstructionsEnabled)
                }
            >
                Live mode
            </button>
            {source && (
                <p>
                    Bron: <Link href={source}>{source}</Link>
                </p>
            )}

            <LiveInstructions
                steps={steps}
                isActive={liveInstructionsEnabled}
                closeHandler={() => setLiveInstructionsEnabled(false)}
            />
        </article>
    )
}

export async function getStaticPaths() {
    const paths = await client.fetch(
        groq`*[_type == "recipe" && defined(slug.current)][].slug.current`
    )

    return {
        paths: paths.map((slug: string) => ({ params: { slug } })),
        fallback: true,
    }
}

interface ResultData {
    recipe: Recipe
}

export const getStaticProps: GetStaticProps<ResultData> = async (context) => {
    // It's important to default the slug so that it doesn't return "undefined"
    const slug = context.params?.slug as string
    const recipe = await client.fetch(GetRecipe, { slug })
    return {
        props: {
            recipe,
        },
    }
}
export default RecipePost

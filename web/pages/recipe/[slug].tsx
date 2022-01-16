import React, { useState } from "react"
import groq from 'groq'
import imageUrlBuilder from '@sanity/image-url'
// import BlockContent from '@sanity/block-content-to-react'
import client from '../../client'
import { Recipe } from "../../api/Types"
import { GetRecipe } from "../../api/Queries"
import { GetStaticProps } from "next"
import Link from 'next/link'
import { Box } from "@mui/material"

import IngredientList from "../../components/IngredientList"
import StepList from "../../components/StepList"
import LiveInstructions from '../../components/LiveInstructions'

function urlFor(source: string) {
    return imageUrlBuilder(client).image(source)
}

const RecipePost: React.FC<{ recipe: Recipe }> = ({ recipe }) => {
    if (!recipe) return null

    const [liveInstructionsEnabled, setLiveInstructionsEnabled] = useState<boolean>(false);

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
        source
    } = recipe

    return (
        <article>
            <h1>{title}</h1>
            <p>Serves: {servings}</p>
            <p>Duratie: {cookTime} minuten</p>
            <img
                src={urlFor(image)
                    .width(300)
                    .url()}
            />

            {
                tags && (
                    <ul>
                        Tags
                        {tags.map((tag, i) => <li key={i}>{tag}</li>)}
                    </ul>
                )
            }

            <Box sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
            }}>
                <Box sx={{
                    minWidth: '300px'
                }}>
                    {
                        ingredients && <IngredientList ingredients={ingredients} />
                    }
                </Box>
                <Box>
                    {
                        steps && <StepList steps={steps} />
                    }
                </Box>
            </Box>
            <button onClick={() => setLiveInstructionsEnabled(!liveInstructionsEnabled)}>Live mode</button>
            {
                source && <p>Bron: <Link href={source}>{source}</Link></p>
            }

            <LiveInstructions steps={steps} isActive={liveInstructionsEnabled} closeHandler={() => setLiveInstructionsEnabled(false)} />

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
    recipe: Recipe;
}

export const getStaticProps: GetStaticProps<ResultData> = async (context) => {
    // It's important to default the slug so that it doesn't return "undefined"
    const slug = context.params?.slug as string
    const recipe = await client.fetch(GetRecipe, { slug })
    return {
        props: {
            recipe
        }
    }
}
export default RecipePost
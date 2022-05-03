import imageUrlBuilder from '@sanity/image-url'
import type { ImageUrlBuilder } from '@sanity/image-url/lib/types/builder'
import groq from 'groq'
import type { GetStaticPaths, GetStaticProps } from 'next'
import Link from 'next/link'
import type { FC } from 'react'

// import BlockContent from '@sanity/block-content-to-react'
import GenericTemplate from '@/templates/Generic'

import { GetRecipe } from '../../api/Queries'
import type { Recipe } from '../../api/Types'
import client from '../../client'
import IngredientList from '../../components/IngredientList'
import StepList from '../../components/StepList'

function urlFor(source: string): ImageUrlBuilder {
    return imageUrlBuilder(client).image(source)
}

const RecipePost: FC<{ recipe: Recipe }> = ({ recipe }) => {
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
        <GenericTemplate>
            <article>
                <h1 className="font-playfair text-4xl py-4">{title}</h1>
                <p>Serves: {servings}</p>
                <p>Duratie: {cookTime} minuten</p>
                {description && <p>{description}</p>}
                <p>Gepubliseerd op: {new Date(publishedAt).toDateString()}</p>
                <img
                    src={urlFor(image).width(300).url()}
                    alt={title}
                    className="py-4"
                />

                {tags.length > 0 && (
                    <ul>
                        Tags
                        {tags.map((tag) => (
                            <li key={tag._id}>{tag.name}</li>
                        ))}
                    </ul>
                )}

                <div className="flex flex-col sm:flex-row">
                    <div className="min-w-[300px]">
                        {ingredients && (
                            <IngredientList ingredients={ingredients} />
                        )}
                    </div>
                    <div>{steps && <StepList steps={steps} />}</div>
                </div>
                {source && (
                    <p>
                        Bron: <Link href={source}>{source}</Link>
                    </p>
                )}
            </article>
        </GenericTemplate>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    const paths: string[] = await client.fetch(
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
    const recipe: Recipe = await client.fetch(GetRecipe, { slug })
    return {
        props: {
            recipe,
        },
    }
}
export default RecipePost

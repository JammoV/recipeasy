import React from "react";
import groq from 'groq'
import imageUrlBuilder from '@sanity/image-url'
// import BlockContent from '@sanity/block-content-to-react'
import client from '../../client'
import { Recipe } from "../../api/Types";
import { GetStaticProps } from "next";
import Link from 'next/link'

function urlFor (source: string) {
    return imageUrlBuilder(client).image(source)
}

const RecipePost: React.FC<{recipe: Recipe}> = ({recipe}) => {
    if(!recipe) return null

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
        <>
        <Link href="/">Terug</Link>
        <article>
            <h1>{title}</h1>
            <p>Serves: {servings}</p>
            <p>Duratie: {cookTime} minuten</p>
            {
                source && <p>Dit recept is afkomstig van: <a href="{source}" target="_blank">{source}</a></p>
            }
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
            <h2>Ingredienten</h2>
            {
                ingredients && (
                    <ul>
                        {
                            ingredients.map((ingredient, i) => (
                                <li key={i}>
                                    {`${ingredient.amount} ${ingredient.unit} ${ingredient.product}`}
                                    {` `}
                                    {ingredient.note && `(${ingredient.note})`}
                                </li>
                            )
                        )}
                    </ul>
                )
            }
            <h2>Bereiding</h2>
            {
                steps && (
                    <ul>
                        {steps.map((step, i) => <li key={i}>{step}</li>)}
                    </ul>
                )
            }
            
        </article>
        </>
    )
}

const query = groq`*[_type == "recipe" && slug.current == $slug][0]{
  title,
  image,
  description,
  publishedAt,
  servings,
  cookTime,
  "tags": tags[]->name,
  "ingredients": ingredients[]{amount,unit,note,'product':ingredient_product->name},
  steps,
  source
}`

export async function getStaticPaths() {
    const paths = await client.fetch(
        groq`*[_type == "recipe" && defined(slug.current)][].slug.current`
    )

    return {
        paths: paths.map((slug: string) => ({params: {slug}})),
        fallback: true,
    }
}

interface ResultData {
    recipe: Recipe;
}

export const getStaticProps: GetStaticProps<ResultData> = async (context) => {
    // It's important to default the slug so that it doesn't return "undefined"
    const slug = context.params?.slug as string
    const recipe = await client.fetch(query, { slug })
    return {
        props: {
            recipe
        }
    }
}
export default RecipePost
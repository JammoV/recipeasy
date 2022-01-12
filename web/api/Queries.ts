import groq from 'groq'

export const GetRecipe = groq`*[_type == "recipe" && slug.current == $slug][0]{
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
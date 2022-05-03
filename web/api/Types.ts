export interface Recipe {
    _id: string
    title: string
    slug: {
        current: string
    }
    image: string
    description: string
    publishedAt: string
    servings: number
    cookTime: number
    tags: Tag[]
    ingredients: Ingredient[]
    steps: Step[]
    source: string
}

export interface Tag {
    _id: string
    name: string
    category: string
}

export interface Ingredient {
    _id: string
    amount: number
    unit: string
    product: string
    note: string
}

export interface Step {
    _id: string
    instruction: string
    duration: number
    isPreparation: boolean
}

export interface Product {
    _id: string
    name: string
    brand: Brand
    isBasic: boolean
}

export interface Brand {
    _id: string
    name: string
}

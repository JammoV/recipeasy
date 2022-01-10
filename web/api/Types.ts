export interface Recipe {
    _id: string;
    title: string;
    slug: {
        current: string;
    }
    image: string;
    description: string;
    publishedAt: string;
    servings: number;
    cookTime: number;
    tags: Tag[];
    ingredients: Ingredient[];
    steps: Step[];
    source: string;
}

export interface Tag {
    _id: string;
    name: string;
    category: string;
}

export interface Ingredient {
    amount: number;
    unit: string;
    product: string;
    note: string;
}

export interface Step {
    step: string;
}

export interface Product {
    name: string;
    brand: Brand;
}

export interface Brand {
    name: string;
}

export interface Recipe {
    id: number,
    name : string,
    difficulty: string | null,
    cuisine: string,
    tags: string[],
    userId: number,
    image: string,
    rating: number,
    mealType: string[],
    instructions: string[] | null,
    ingredients: string[] | null
}
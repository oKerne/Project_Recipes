import { createContext, Dispatch } from "react";


export type RecipeType = {
    id: number;
    title: string;
    image?: string,
    servings?: number;
    ingredients: { [key: string]: string[] };
    instructions: { [key: string]: string[] };
}

type Action = 
  | { type: 'SET_RECIPES'; data: RecipeType[] }
  | { type: 'ADD_RECIPE'; data: RecipeType }

const recipeReducer = (state: RecipeType[], action: Action): RecipeType[] => {
    switch (action.type) {
        case 'SET_RECIPES':
            return action.data;
        case 'ADD_RECIPE':
            return [...state, action.data]
        default:
            return state;
    }
}

export default recipeReducer

export const initialRecipesState: RecipeType[] = [];

export const RecipeContext = createContext<{
    state: RecipeType[];
    dispatch: Dispatch<Action>;
}>({
    state: initialRecipesState,
    dispatch: () => null,
})

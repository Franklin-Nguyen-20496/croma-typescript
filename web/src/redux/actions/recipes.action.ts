import {
    SET_ALL_RECIPES,
    ADD_ONE_RECIPE,
    UPDATE_ONE_RECIPE,
    DELETE_ONE_RECIPE,
} from '../types/recipes.types';
import Recipe from '../../Interfaces/recipe.interface';

export const setAllRecipes = (values: Recipe[]) => {
    return {
        type: SET_ALL_RECIPES,
        payload: values,
    }
}

export const addOneRecipe = (value: Recipe) => {
    return {
        type: ADD_ONE_RECIPE,
        payload: value,
    }
}

export const updateOneRecipe = (value: Recipe) => {
    return {
        type: UPDATE_ONE_RECIPE,
        payload: value,
    }
}

export const deleteOneRecipe = (id: string) => {
    return {
        type: DELETE_ONE_RECIPE,
        payload: id,
    }
}

import {
    SET_ALL_RECIPES,
    ADD_ONE_RECIPE,
    UPDATE_ONE_RECIPE,
    DELETE_ONE_RECIPE,
}
    from '../types/recipes.types';
import Action from '../../Interfaces/action.interface';
import Recipe from '../../Interfaces/recipe.interface';

export interface initialRecipes {
    list: Recipe[];
}

const initialState: initialRecipes = {
    list: [],
}

const recipesReducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case SET_ALL_RECIPES:
            return {
                ...state,
                list: action.payload,
            }
        case ADD_ONE_RECIPE:
            const newListAddOne = [...state.list, action.payload];
            return {
                ...state,
                list: newListAddOne,
            }

        case UPDATE_ONE_RECIPE:
            const newListUpdate = [...state.list].map(item => {
                if (action.payload.id === item.id) {
                    return action.payload;
                }
                else return item;
            })
            return {
                ...state,
                list: newListUpdate,
            }
        case DELETE_ONE_RECIPE:
            const newListDelete = [...state.list].filter(item => item.id !== action.payload);
            return {
                ...state,
                list: newListDelete,
            }

        default:
            return state;
    }
}

export default recipesReducer;
import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    dishes: {
        items: [],
        status: 'loading',
    },
    tags: {
        items: [],
        status: 'loading',
    },
    ingredients: {
        items: [],
        status: 'loading',
    },
};

const dishesSlice = createSlice({
    name: 'dishes',
    initialState,
    reducer: {},
})

export const dishesReducer = dishesSlice.reducer;
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from '../../axios';

/** Запрос (action) на получение блюд 
 * @async
 * @param 
*/
export const fetchDishes = createAsyncThunk('dishes/fetchDishes', async () => {
    /** Получение data из axios-запроса */
    const { data } = await axios.get('/dishes');
    return data;
});

/** Запрос (action) на получение тэгов 
 * @async
 * @param 
*/
export const fetchTags = createAsyncThunk('dishes/fetchTags', async () => {
    /** Получение data из axios-запроса */
    const { data } = await axios.get('/tags');
    return data;
});

/** Запрос (action) на получение ингредиентов 
 * @async
 * @param 
*/
export const fetchIngredients = createAsyncThunk('dishes/fetchIngredients', async () => {
    /** Получение data из axios-запроса */
    const { data } = await axios.get('/ingredients');
    return data;
});

/** Начальное состояние */
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

/** Slice для упрощенной работы с reducer */
const dishesSlice = createSlice({
    name: 'dishes',
    initialState,
    reducer: {},
    /** Описание состояния асинхронного action для понимания, когда идёт загрузка данных с backend*/
    extraReducers: {
        /** При состоянии pending - загрузка */
        [fetchDishes.pending]: (state) => {
            state.dishes.items = [];
            state.dishes.status = 'loading';
        },
        /** При состоянии fullfilled - загружено */
        [fetchDishes.fulfilled]: (state, action) => {
            state.dishes.items = action.payload;
            state.dishes.status = 'loaded';
        },
        /** Если при загрузке произошла ошибка */
        [fetchDishes.rejected]: (state) => {
            state.dishes.items = [];
            state.dishes.status = 'error';
        },


        [fetchTags.pending]: (state) => {
            state.tags.items = [];
            state.tags.status = 'loading';
        },
        [fetchTags.fulfilled]: (state, action) => {
            state.tags.items = action.payload;
            state.tags.status = 'loaded';
        },
        [fetchTags.rejected]: (state) => {
            state.tags.items = [];
            state.tags.status = 'error';
        }
    }
})

export const dishesReducer = dishesSlice.reducer;
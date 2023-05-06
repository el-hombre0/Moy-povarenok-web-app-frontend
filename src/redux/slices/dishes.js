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
    }
})

export const dishesReducer = dishesSlice.reducer;
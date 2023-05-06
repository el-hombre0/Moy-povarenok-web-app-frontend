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
})

export const dishesReducer = dishesSlice.reducer;
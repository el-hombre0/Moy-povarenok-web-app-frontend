import { configureStore } from "@reduxjs/toolkit"
import { dishesReducer } from "./slices/dishes";

/** Хранилище */
const store = configureStore({
    reducer: {
        dishes: dishesReducer,
    },
});


export default store;
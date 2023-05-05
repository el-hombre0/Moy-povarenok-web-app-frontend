import { configureStore } from "@reduxjs/toolkit"
import { dishesReducer } from "./slices/dishes";


const store = configureStore({
    reducer: {
        dishes: dishesReducer,
    },
});


export default store;
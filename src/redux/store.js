import { configureStore } from "@reduxjs/toolkit"
import { dishesReducer } from "./slices/dishes";
import { authReducer } from "./slices/auth";

/** Хранилище */
const store = configureStore({
    reducer: {
        dishes: dishesReducer,
        auth: authReducer,
    },
});


export default store;
import { configureStore } from "@reduxjs/toolkit"
import { dishesReducer } from "./slices/dishes";
import { authReducer } from "./slices/auth";
import { usersReducer } from "./slices/users";

/** Хранилище */
const store = configureStore({
    reducer: {
        dishes: dishesReducer,
        auth: authReducer,
        users: usersReducer,
    },
});


export default store;
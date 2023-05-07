import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

/**
 * @param params email и пароль
 */
export const fetchAuth = createAsyncThunk("auth/fetchAuth", async (params) => {
  const { data } = await axios.post("/auth/login", params);
  return data;
});

/**Начальное состояние для user */
const initialState = {
  data: null,
  status: "loading",
};

/** Slice для получения информации о user из async action.
 * После получения информация сохраняется в state.
 */
const authSlice = createSlice({
  name: "auth",
  initialState,
  /**Выход из аккаунта */
  reducers: {
    logout: (state) => {
      state.data = null;
    },
  },
  extraReducers: {
    [fetchAuth.pending]: (state) => {
      state.data = null;
      state.status = "loading";
    },
    /** При состоянии fullfilled - загружено */
    [fetchAuth.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
    },
    /** Если при загрузке произошла ошибка */
    [fetchAuth.rejected]: (state) => {
      state.data = null;
      state.status = "error";
    },
  },
});

/**Проверка, авторизован ли клиент */
export const selectIsAuth = (state) => Boolean(state.auth.data);

export const authReducer = authSlice.reducer;

export const { logout } = authSlice.actions;
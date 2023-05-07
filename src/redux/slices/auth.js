import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

/**
 * @param params email и пароль
 */
export const fetchAuth = createAsyncThunk("auth/fetchAuth", async (params) => {
  const { data } = await axios.post("/auth/login", params);
  return data;
});

/**Проверка, авторизован ли user.
 * Axios автоматически передаст token из LocalStorage в backend
 */
export const fetchAuthMe = createAsyncThunk("auth/fetchAuthMe", async () => {
  const { data } = await axios.get("/auth/me");
  return data;
});

export const fetchRegister = createAsyncThunk(
  "auth/fetchRegister",
  async (params) => {
    const { data } = await axios.post("auth/register", params);
    return data;
  }
);

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
    /** fetchAuth */
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

    /** fetchAuthMe */
    [fetchAuthMe.pending]: (state) => {
      state.data = null;
      state.status = "loading";
    },
    [fetchAuthMe.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
    },
    [fetchAuthMe.rejected]: (state) => {
      state.data = null;
      state.status = "error";
    },

    /** fetchRegister */
    [fetchRegister.pending]: (state) => {
      state.data = null;
      state.status = "loading";
    },
    /** При состоянии fullfilled - загружено */
    [fetchRegister.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
    },
    /** Если при загрузке произошла ошибка */
    [fetchRegister.rejected]: (state) => {
      state.data = null;
      state.status = "error";
    },
  },
});

/**Проверка, авторизован ли клиент */
export const selectIsAuth = (state) => Boolean(state.auth.data);

export const authReducer = authSlice.reducer;

export const { logout } = authSlice.actions;

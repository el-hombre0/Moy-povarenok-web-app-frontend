import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchUsers = createAsyncThunk(
  "/profile/fetchUsers",
  async () => {
    // const { usersData } = await axios.get(`/profile/users`);
    const usersData = await axios.get(`/profile/users`, {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    });
    console.log(usersData);
    return usersData.data;
  }
);
/**
 * const fetchPost = createAsyncThunk('fetch/post', async (params: string) => {
    try {
            const { data } = await axios.get('https://registry.npmjs.org/-/v1/search', { params: { text: params } })
            data.objects.map((result: any) => {
                console.log('result', result)//getting result
                return result.package.name; 
            });
        } catch (err: any) {
            return err?.response;
        }
})

const fetchPost = createAsyncThunk('fetch/post', async (params: string) => {
    try {
            const { data } = await axios.get('https://registry.npmjs.org/-/v1/search', { params: { text: params } })
            return data.objects.map((result: any) => {
                console.log('result', result)//getting result
                return result.package.name; 
            });
        } catch (err: any) {
            return err?.response;
        }
 */

const initialState = {
    items: [],
    status: "loading",
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducer: {},
  extraReducers: {
    [fetchUsers.pending]: (state) => {
      state.items = [];
      state.status = "loading";
    },
    [fetchUsers.fulfilled]: (state, action) => {
      state.items = action.payload;
      console.log("action.payload=",action.payload)
      state.status = "loaded";
    },
    [fetchUsers.rejected]: (state) => {
      state.items = [];
      state.status = "error";
    },
  },
});

export const usersReducer = usersSlice.reducer;

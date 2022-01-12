import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  InitialAuthState,
  LoginReturnType,
  Credentials,
} from "../../util/types";
import {TOKEN} from "../../util/constants"
import axios from "../../util/axios"
const initialState: InitialAuthState = {
  isLoggedIn: false,
  access_token: null,
  expire_date: null,
  error: null
}

export const logout = createAsyncThunk(
  "auth/logout",
  async() => {
    localStorage.removeItem(TOKEN)
    return await axios.delete("/users/logout").then(res => res.data.ok || false).catch(e => e.message);
  }
)

const loginTheUser = async ({
  username,
  password,
}: Credentials): Promise<LoginReturnType> => {
  return await axios
    .post("/users/login", {
      username,
      password,
    })
    .then((res) => {
      const token = res.data.result.access_token;
      const ex = res.data.result.expire_at;
      localStorage.setItem(
        TOKEN,
        JSON.stringify({ token, ex: Date.now() + +ex })
      );
      return {
        token,
        ex: Date.now() + +ex,
      };
    }).catch(e => ({error: {message:e.message}}));
};

export const login = createAsyncThunk(
  "auth/login",
  async({username, password}:Credentials): Promise<LoginReturnType> => {
    const tokenJson = localStorage.getItem(TOKEN);
    let isTokenStillValid = true;
    if(tokenJson) {
    const tokenObj:LoginReturnType = JSON.parse(tokenJson);
      if(tokenObj.ex && new Date() > new Date(tokenObj.ex)) isTokenStillValid = false;
      else return tokenObj;
    } 
    if (!isTokenStillValid && !username && !password) return {error: {message: "You're not logged in."}};
    else if (!username && !password) return {error: {message: "You're not logged in."}};
    else if (!isTokenStillValid) return await loginTheUser({username,password});
    else return await loginTheUser({username,password});
  }
)

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      state.error = null;
      if (action.payload.token) state.access_token = action.payload.token;
      if (action.payload.ex)
        state.expire_date = +action.payload.ex;
      if(action.payload.error) {
        state.error = action.payload.error;
        state.isLoggedIn = false;
        state.access_token = null;
        state.expire_date = null;
      }
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.isLoggedIn = false;
      state.access_token = null;
      state.expire_date = null;
    });
  },
});

export default authSlice.reducer;

import {configureStore} from "@reduxjs/toolkit"
import { useSelector,useDispatch,TypedUseSelectorHook } from "react-redux"
import postSlice from "./slices/posts.slice"
import authSlice from "./slices/auth.slice"

const store = configureStore({
  reducer: {
    auth: authSlice,
    posts: postSlice
  }
})

export const useTheDispatch = () => useDispatch<typeof store.dispatch>();
export const useTheSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;
export type StoreState = ReturnType<typeof store.getState>;
export default store

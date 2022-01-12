import {configureStore} from "@reduxjs/toolkit"
<<<<<<< HEAD
=======
import { useSelector,useDispatch,TypedUseSelectorHook } from "react-redux"
import postSlice from "./slices/posts.slice"
>>>>>>> 0d8e99c (whole project)
import authSlice from "./slices/auth.slice"

const store = configureStore({
  reducer: {
<<<<<<< HEAD
    auth: authSlice
  }
})
=======
    auth: authSlice,
    posts: postSlice
  }
})

export const useTheDispatch = () => useDispatch<typeof store.dispatch>();
export const useTheSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;
export type StoreState = ReturnType<typeof store.getState>;
export default store
>>>>>>> 0d8e99c (whole project)

import { createSlice, createAsyncThunk, AsyncThunk } from "@reduxjs/toolkit";
import {
  AllPostsPayload,
  PostsReturnType,
  SearchPostsPayload,
  GetPagePostsPayload,
  InitialPostsState,
} from "../../util/types";
import axios from "../../util/axios"
interface ThunkArgsType {
  url: string;
  payloadProps: (keyof SearchPostsPayload|keyof GetPagePostsPayload|keyof AllPostsPayload)[];
  prefix: string;
}

function createThunk<P>(args:ThunkArgsType & ThunkArgsType): AsyncThunk<PostsReturnType,P,{}> {
  return createAsyncThunk(
  args.prefix,
  async (payload:P): Promise<PostsReturnType> => {
    let url = args.url;
    args.payloadProps.forEach((p) => {
      url = url.replace(/\[x\]/, (payload as any)[p]);
    });
    if (args.payloadProps.some(p => !!(payload as any)[p])) {
      return await axios
        .get(url)
        .then((res) => ({
          posts: res.data.result.items,
          totalPages: res.data.result._meta.pageCount,
          currentPage: res.data.result._meta.currentPage || 1,
        }))
        .catch((e) => ({ error: { message: e.message } }));
    } else {
      return {
        error: {
          message: "You're not logged in.",
        },
      };
    }
  }
);
}

export const getPagePosts = createThunk<GetPagePostsPayload>({
  prefix: "posts/getPagePosts",
  payloadProps: ["token","page"],
  url: `/posts?access-token=[x]&page=[x]`,
});
export const searchPosts = createThunk<SearchPostsPayload>({
  prefix: "posts/searchPosts",
  payloadProps: ["token","searchField","searchText"],
  url: `/posts?access-token=[x]&filter[[x]]=[x]`,
})
export const getPosts = createThunk<AllPostsPayload>({
  prefix: "posts/getPosts",
  payloadProps: ["token"],
  url: `/posts?access-token=[x]`,
})
const initialState:InitialPostsState = {
  posts: [],
  totalPages: null,
  currentPage: null,
  error: null
}
const postsSlice = createSlice({
  name: "string",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getPosts.fulfilled,
      (state,action) => {
        if(action.payload.posts) state.posts = action.payload.posts;
        if(action.payload.totalPages) state.totalPages = action.payload.totalPages;
        if(action.payload.currentPage) state.currentPage = action.payload.currentPage;
        if(action.payload.error) state.error = {message: action.payload.error.message}
      }
    );
    builder.addCase(
      searchPosts.fulfilled,
      (state,action) => {
        if(action.payload.posts) state.posts = action.payload.posts;
        if(action.payload.totalPages) state.totalPages = action.payload.totalPages;
        if(action.payload.currentPage) state.currentPage = action.payload.currentPage;
        if(action.payload.error) state.error = {message: action.payload.error.message}
      }
    );
    builder.addCase(
      getPagePosts.fulfilled,
      (state,action) => {
        if(action.payload.posts) state.posts = action.payload.posts;
        if(action.payload.totalPages) state.totalPages = action.payload.totalPages;
        if(action.payload.currentPage) state.currentPage = action.payload.currentPage;
        if(action.payload.error) state.error = {message: action.payload.error.message}
      }
    );
  }
})

export default postsSlice.reducer

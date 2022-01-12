// -------------------POST SLICE
export interface Post {
  id: number
  title: string
  content: string
  status: string
  created_at: string
  updated_at: string
}
export interface SearchPostsPayload {
  token: string;
  searchField: string;
  searchText: string;
}
export interface GetPagePostsPayload {
  token: string;
  page: number
}
export interface AllPostsPayload {
  token: string;
}
export interface PostsReturnType {
  totalPages?: number;
  currentPage?: number;
  posts?: Post[];
  error?: {
    message: string;
  };
}

export interface InitialPostsState {
  totalPages: number | null;
  currentPage: number | null;
  posts: Post[]
  error: null | {message: string}
}

// -------------------AUTH SLICE
export interface InitialAuthState {
  isLoggedIn: boolean
  access_token: string | null
  expire_date: number | null
  error:  {message: string}| null
}
export interface Credentials {
  username?: string
  password?: string
}
export interface LoginReturnType{
  token?:string;
  ex?:number
  error?: {message: string}
}

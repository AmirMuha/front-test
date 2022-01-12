import {useEffect} from "react"
import {useNavigate} from "react-router-dom"
import {useTheSelector} from "../store/index"

/**
 * @description Use this hook to check if the user is authenticated.
 * @param destPath - provide a destination path to navigate to if the user is already logged in.
 *
 * @example
 * ```js
 * const isLoggedIn = useAuth();
 * if(isLoggedIn) doSomething();
 * ```
 */
const useAuth = (destPath: string = "/") => {
  const isLoggedIn = useTheSelector(state => state.auth.isLoggedIn);
  const navigate = useNavigate();
  useEffect(() => {
    if(!isLoggedIn) navigate(destPath,{replace: true});
  },[]);
}

export default useAuth

import {useState} from "react"

interface Props {
  username: string
  password: string
}

/**
 * @description Use this hook to login the user.
 * @param username - string
 * @param password - string
 * @example
 * ```js
 * const wasLoginSuccessfull = useLogin({
 *    username: "",
 *    password: "",
 * })
 * ```
 */
const useLogin = (): {
  success: boolean;
  loading: boolean;
  login: (username: string,password: string) => void
} => {
  const [success, setSuccess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  /**
   * @description Use this function to login the user.
  */
  const login = (username: string,password: string) => {
    setIsLoading(true)
  }
  return {
    success,
    loading: isLoading,
    login,
  };
};

export default useLogin

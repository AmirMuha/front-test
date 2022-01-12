import {isValidElement,FC,Children,cloneElement} from "react"
import {Navigate} from "react-router-dom"
import { useTheSelector } from "../../store/index"

const ProtectedRoute: FC = ({ children }) => {
  const authState = useTheSelector((state) => ({
    isLoggedIn: state.auth.isLoggedIn,
    access_token: state.auth.access_token,
    expire_date: state.auth.expire_date,
  }));
  if (!authState.isLoggedIn) return <Navigate to="/auth/login" replace />;
  const theChild = Children.map(children, (child) => {
    if (isValidElement(child)) {
      return cloneElement(child, {access_token: authState.access_token});
    }
    return child;
  });
  return <>{theChild}</>;
};

export default ProtectedRoute

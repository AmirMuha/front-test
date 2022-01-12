import './App.css';
import {useEffect} from "react"
import {useTheDispatch} from "./store/index"
import {login} from "./store/slices/auth.slice"
import Dashboard from "./pages/Dashboard"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Auth from "./pages/Auth"
import {
  Routes,
  Route,
  BrowserRouter
} from "react-router-dom";
import ProtectedRoute from './components/App/ProtectedRoute';

function App() {
  const dispatch = useTheDispatch();
  useEffect(() => {
    dispatch(login({}));
  },[])
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="auth" element={<Auth />}>
          <Route path="login" element={<Login />} />
        </Route>
        <Route
          path="dashboard"
          element={
            <ProtectedRoute>
              <Dashboard access_token="" />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

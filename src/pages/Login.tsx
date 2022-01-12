import {memo,useReducer, FormEvent, Reducer, useCallback, useState } from "react"
import Alert from "@mui/material/Alert"
import Snackbar from "@mui/material/Snackbar"
import {login} from "../store/slices/auth.slice"
import {useTheDispatch} from "../store/index"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import FormControl from "@mui/material/FormControl"
import {FC} from "react"
import {useNavigate} from "react-router-dom"
import {createPortal} from "react-dom"

enum ReducerTypes {
  USER = "USER",
  PASS = "PASS"
}
interface ReducerInitialState {
  username: {
    isValid: boolean
    value: string
  }
  password: {
    isValid: boolean
    value: string
  }
}
interface ReducerAction {
  type: ReducerTypes | null
  value: string
}

const reducerInitialState: ReducerInitialState = {
  username: {
    isValid: false,
    value: ""
  },
  password: {
    isValid: false,
    value: ""
  },
}
const actions: ReducerAction = {
  type: null,
  value: ""
}
const reducer:Reducer<ReducerInitialState,ReducerAction> = (state,{type,value}) => {
  switch (type) {
    case ReducerTypes.USER:
      return {
        ...state,
        username: {
          isValid: /[a-zA-Z0-9]{3,}[^$#\.\s&%]/.test(value.trim()) ? true:false,
          value,
        },
      };
    case ReducerTypes.PASS:
      return {
        ...state,
        password: {
          isValid: /[a-zA-Z0-9@$#\/\.]{3,}[^\s]/.test(value.trim()) ? true:false,
          value,
        },
      };
    default:
      return state;
  }
}

const Login: FC = () => {
  const dispatch = useTheDispatch();
  const navigate = useNavigate();
  const [credentials, dispatchCredentials] = useReducer(reducer,reducerInitialState)
  const [error,setError] = useState<string|null>(null);
  const [isAlertOpen,setAlertOpen] = useState<boolean>(false);

  const username = credentials.username.value;
  const password = credentials.password.value;
  const submitForm = useCallback((e:FormEvent ) => {
    e.preventDefault();
    dispatch(
      login({
        username,
        password,
      })
    ).then(res => {
      if((res.payload as any).error) {
        setError("Username or Password is invalid.")
        setAlertOpen(true)
      } else {
        navigate("/dashboard")
        setError(null)
      }
    });
  },[username,password]);
  return (
    <>
      {!!error &&
        createPortal(
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={isAlertOpen}
            autoHideDuration={6000}
            onClose={() => setAlertOpen(false)}
          >
            <Alert
              onClose={() => setAlertOpen(false)}
              severity="error"
              sx={{ width: "100%" }}
            >
              {error}
            </Alert>
          </Snackbar>,
          document.body
        )}
      <Typography sx={{ marginBottom: 4 }} variant="h5" component="h1">
        Login
      </Typography>
      <FormControl
        component="form"
        sx={{
          width: {
            sm: "300px",
            md: "400px",
          },
        }}
        onSubmit={submitForm}
      >
        <Box sx={{ width: "100%", textAlign: "left", marginBottom: 1 }}>
          <TextField
            sx={{ width: "100%" }}
            variant="filled"
            label="Username"
            error={!credentials.username.isValid}
            onChange={(e) =>
              dispatchCredentials({
                type: ReducerTypes.USER,
                value: e.currentTarget.value,
              })
            }
            type="text"
          />
          <br />
          <Typography
            color={!credentials.username.isValid ? "error" : "green"}
            variant="caption"
            component="small"
          >
            {!credentials.username.isValid ? "Username is required." : "Valid"}
          </Typography>
        </Box>
        <Box sx={{ textAlign: "left", marginBottom: 1 }}>
          <TextField
            sx={{ width: "100%" }}
            variant="filled"
            label="Password"
            error={!credentials.password.isValid}
            onChange={(e) =>
              dispatchCredentials({
                type: ReducerTypes.PASS,
                value: e.currentTarget.value,
              })
            }
            type="password"
          />
          <br />
          <Typography
            color={!credentials.password.isValid ? "error" : "green"}
            variant="caption"
            component="small"
          >
            {!credentials.password.isValid
              ? `Password is required.
                Minimum length is 4 characters.`
              : "valid"}
          </Typography>
        </Box>
        <Button
          disabled={
            !credentials.password.isValid || !credentials.username.isValid
          }
          type="submit"
          variant="contained"
          color="primary"
        >
          Login
        </Button>
      </FormControl>
    </>
  );
}
export default memo(Login)

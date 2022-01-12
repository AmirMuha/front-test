import {memo,FC, PropsWithChildren} from "react"
import {Navigate} from "react-router-dom"
import {useTheSelector} from "../store/index"
import Stack from "@mui/material/Stack"
import {Outlet} from "react-router-dom"
import Box from "@mui/material/Box"
import Layout from "../components/Layout/Layout"

interface Props {}

const Auth: FC<PropsWithChildren<Props>> = () => {
  const isLoggedIn = useTheSelector(state => state.auth.isLoggedIn);
  if(isLoggedIn) {
    return <Navigate to="/dashboard" replace />
  }
  return (
    <Layout title="Login or Register | Wsafar">
      <Box
        sx={{
          margin: "50px auto",
          padding: 0,
          boxShadow: 4,
          backgroundColor: "white",
        }}
      >
        <Stack
          direction="column"
          sx={{
            flexDirection: {
              md: "row",
            },
          }}
        >
          <Box sx={{
            minHeight: "300px",
            position: "relative",
            background: "url(https://b2b.wsafar.com/img/polygon-bg.svg) top center no-repeat",
            backgroundSize: "cover",
            padding: "50px",
            flex: 1,
          }}>
            <img
              style={{position: "absolute",top:"50%",left:"50%",transform: "translate(-50%,-50%)"}}
              width="160"
              src="https://b2b.wsafar.com/img/logo-light.svg"
              alt="auth background image"
            />
          </Box>
          <Box sx={{
            padding: "50px",
            textAlign: "center",
            flex: 1
          }}>
            <Outlet />
          </Box>
        </Stack>
      </Box>
    </Layout>
  );
}

export default memo(Auth)

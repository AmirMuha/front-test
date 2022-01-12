import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import SVGIcon from '@mui/material/SvgIcon'
import Divider from "@mui/material/Divider"
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import {FC,PropsWithChildren,memo} from "react"
import Layout from "../components/Layout/Layout"
import {useNavigate} from "react-router-dom"
import {TriangleIcon} from "../util/IconsSVG"

interface Props {}
const Home: FC<PropsWithChildren<Props>> = () => {
  const navigate = useNavigate()
  return (
    <Layout title="Home Page | Wsafar">
      <Box
        sx={{
          margin: "50px auto",
          padding: "50px",
          boxShadow: 4,
          backgroundColor: "white",
        }}
      >
        <Typography
          sx={{ display: "flex", gap: 1, alignItems: "center" }}
          variant="h5"
          component="h1"
        >
          <SVGIcon
            sx={{
              transform: "rotate(180deg)",
              marginTop: "4px",
            }}
          >
            {TriangleIcon}
          </SVGIcon>
          How Wsafar Start?
        </Typography>
        <Typography
          variant="body1"
          component="p"
          sx={{ lineHeight: 2, textAlign: "justify" }}
        >
          Giti Samaneh Novin Shargh (Wsafar brand) has started since 2014.
          Wsafar’s purpose is to facilitate the reservation process by
          implementation of new methods of IT science. Wsafar has furnished
          travel agencies by B2B Service. Wsafar operates in reserving of
          international hotel. Nowadays, technological advances in IT have
          increased the level of expectation of tourists about the speed and how
          they received services from the travel agencies. According to this
          situation, Wsafar has responded with profit of using IT science and
          creative new methods in Information Technology. The Wsafar system is
          designed to provide online services emphasizing the use of IT science
          in the booking of foreign hotels and the provision of online tourism
          services, so that users (travel agencies) can enjoy the quality of
          online and high-quality service, as well as the possibility to pay
          reservations of foreign hotels are provided instantly and in Rial in
          the Wsafar system.
        </Typography>
        <Divider sx={{ margin: 4 }}>
          <Typography
            sx={{ display: "flex", gap: 1, alignItems: "center" }}
            variant="h5"
            component="h1"
          >
            Start Using Our Services
          </Typography>
        </Divider>
        <Stack
          direction="row"
          gap={2}
          sx={{
            margin: "20px 0",
            justifyContent: "center",
          }}
        >
          <Button
            onClick={() => navigate("/auth/login")}
            sx={{backgroundColor: "#932E49"}}
            variant="contained"
          >
            Login
          </Button>
        </Stack>
      </Box>
    </Layout>
  );
}
export default memo(Home)


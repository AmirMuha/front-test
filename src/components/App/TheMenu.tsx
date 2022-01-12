import {FC,memo} from "react"
import List from "@mui/material/List"
import Typography from "@mui/material/Typography"
import ListItem from "@mui/material/ListItem"
import TheNavLink from "./TheNavLink"
import {useTheSelector,useTheDispatch} from "../../store/index"
import {logout} from "../../store/slices/auth.slice"
import Button from "@mui/material/Button"
import SVGIcon from "@mui/material/SvgIcon"
import {HomeIcon,DashboardIcon, LogoutIcon} from "../../util/IconsSVG";



const TheMenu:FC = () => {
  const dispatch = useTheDispatch();
  const isLoggedIn = useTheSelector(state => state.auth.isLoggedIn);
  return (
    <List
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "4px",
      }}
    >
      {isLoggedIn && (
        <>
        <TheNavLink text="Dashboard" to="/dashboard" icon={DashboardIcon} />
        <ListItem sx={{ padding: 1 }}>
          <Button
            onClick={() => dispatch(logout())}
            color="secondary"
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <SVGIcon>{LogoutIcon}</SVGIcon>
            <Typography variant="body2" component="span" marginTop={1}>
              Logout
            </Typography>
          </Button>
        </ListItem>
          </>
          )}
          <TheNavLink text="Home" to="/" icon={HomeIcon} />

        </List>
  );
}

export default memo(TheMenu)

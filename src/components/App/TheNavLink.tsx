import {memo,FC,PropsWithChildren,ReactElement} from "react";
import SVGIcon from '@mui/material/SvgIcon'
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import ListItem from "@mui/material/ListItem";
import {useNavigate} from "react-router-dom";

interface Props {
  text: string;
  to: string;
  icon?: ReactElement;
}
const TheNavLink: FC<PropsWithChildren<Props>> = ({
  text,to,icon
}) => {
  const navigate = useNavigate();
  return (
    <ListItem sx={{ padding: 1 }}>
      <Button
        onClick={() => navigate(to)}
        color="secondary"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {icon && <SVGIcon>{icon}</SVGIcon>}
        <Typography variant="body2" component="span" marginTop={icon ? 1 : 0}>
          {text}
        </Typography>
      </Button>
    </ListItem>
  );
};

export default memo(TheNavLink)

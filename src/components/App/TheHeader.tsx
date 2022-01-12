import {memo,FC,PropsWithChildren} from "react";
import Container from "@mui/material/Container"
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import TheMenu from "./TheMenu"
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

interface Props {}
const TheHeader: FC<PropsWithChildren<Props>> = ({ children }) => {
  return (
    <header>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "white",
          color: "black",
        }}
      >
        <Container>
          <Toolbar>
            <Stack
              width="100%"
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box>
                <img
                  src="https://wsafar.com/images/wsafar-travel-fullscreenlogo.png"
                  alt="logo"
                />
              </Box>
              <TheMenu />
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>
    </header>
  );
};
export default memo(TheHeader)

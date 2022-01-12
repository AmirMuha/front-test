import {FC,PropsWithChildren} from "react"
import Container from "@mui/material/Container"

interface Props {}
const TheMain: FC<PropsWithChildren<Props>> = ({ children }) => {
  return (
    <main>
      <Container>{children}</Container>
    </main>
  );
};
export default TheMain

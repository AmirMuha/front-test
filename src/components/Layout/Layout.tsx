import React, {memo,FC,PropsWithChildren} from "react"
import {Helmet} from "react-helmet"
import TheHeader from "../App/TheHeader";
import TheMain from "../App/TheMain";

interface Props {
  title: string;
}
const Layout: FC<PropsWithChildren<Props>> = ({ children, title }) => {
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <TheHeader />
      <TheMain>
        {children}
      </TheMain>
    </>
  );
};

export default memo(Layout)

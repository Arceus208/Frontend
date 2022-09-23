import React, { useEffect, ReactNode } from "react";
import { Box } from "@chakra-ui/react";

import { useReFreshToken } from "../../hooks/useRefreshToken";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const refresh = useReFreshToken();
  useEffect(() => {
    refresh();
  }, [refresh]);

  return <Box h="100%">{children}</Box>;
};

/* export async function getServerSideProps({ req, res }: any) {
  const cookies = cookie.parse(req.headers.cookie);
  let data = "";

  if (cookies.jid) {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_HOST}/refresh_token`,
      {
        withCredentials: true,
        headers: { cookie: "jid=" + cookies.jid },
      }
    );

    data = response.data.accessToken;

    res.setHeaders;
  }

  return { props: { data } };
}*/

export default Layout;

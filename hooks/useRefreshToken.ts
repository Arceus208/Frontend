import { useCallback } from "react";

import { useAuthContext } from "../context/authContext";

export const useReFreshToken = () => {
  const { setToken } = useAuthContext();

  const refresh = useCallback(async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/refresh_token`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      const data = await response.json();

      setToken(data.accessToken);
    } catch (err) {
      console.log(err);
    }
  }, [setToken]);

  return refresh;
};

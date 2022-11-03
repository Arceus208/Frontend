import { useAuthContext } from "../context/authContext";
import { useCallback, useEffect } from "react";
import { axiosPrivate } from "./axiosPrivate";

export const useAxiosAuth = () => {
  const { token, setToken } = useAuthContext();

  const getRefreshToken = useCallback(async () => {
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

      return data.accessToken;
    } catch (err) {
      console.log(err);
      return "";
    }
  }, [setToken]);

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config: any) => {
        if (!config.headers["authorization"]) {
          config.headers["authorization"] = "Bearer " + token;
        }

        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const config = error?.config;
        if (error?.response?.status === 401 && !config?.sent) {
          config.sent = true;

          const accessToken = await getRefreshToken();

          if (accessToken) {
            config.headers = {
              ...config.headers,
              authorization: "Bearer " + accessToken,
            };
          }
          return axiosPrivate(config);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [token, getRefreshToken]);

  return axiosPrivate;
};

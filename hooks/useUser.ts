import { useEffect, useState } from "react";
import useSWR from "swr";

import { useAxiosAuth } from "../utils/axiosAuth";

export const useUser = () => {
  const axiosAuth = useAxiosAuth();
  const fetcher = (url: string) => axiosAuth.get(url).then((res) => res.data);

  const [isLogin, setIsLogin] = useState<boolean>();

  useEffect(() => {
    const login = sessionStorage.getItem("isLogin");
    if (login && login === "true") {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);

  const { data, mutate, error } = useSWR(
    isLogin ? "/users/getUser" : null,
    fetcher,
    {
      onErrorRetry: async (error, key, config, revalidate, { retryCount }) => {
        if (retryCount >= 2) {
          return;
        }

        if (error.response.status === 401) {
          revalidate({ retryCount });
        }
      },
    }
  );

  const loading = !data && !error;
  const loggedIn = !error && data;
  return { data, loading, loggedIn, mutate, error };
};

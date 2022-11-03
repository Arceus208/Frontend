export const getRefreshToken = async () => {
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

    return data.accessToken;
  } catch (err) {
    console.log(err);
    return "";
  }
};

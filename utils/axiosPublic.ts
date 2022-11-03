import axios from "axios";

export const axiosPublic = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_HOST}`,
  headers: {
    "Content-Type": "application/json",
  },
});

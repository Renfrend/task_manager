import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const getFetchBaseQuery = () =>
  fetchBaseQuery({
    baseUrl: "http://localhost:5000",
    prepareHeaders: (headers) => {
      const accessToken = localStorage.getItem("jwt");

      if (accessToken) {
        headers.set("Authorization", `Bearer ${accessToken}`);
      }

      return headers;
    },
  });

import { createApi } from "@reduxjs/toolkit/query/react";

import { getFetchBaseQuery } from "./get-fetch-base-query";

export const api = createApi({
  baseQuery: getFetchBaseQuery(),
  tagTypes: ["Session", "Tasks"],
  endpoints: () => ({}),
});

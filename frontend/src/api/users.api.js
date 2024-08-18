import { api } from ".";

export const usersApi = api.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "/users/login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: (_, error) => (error ? [] : ["Session"]),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: "/users/register",
        method: "POST",
        body: data,
      }),
      invalidatesTags: (_, error) => (error ? [] : ["Session"]),
    }),
    refreshToken: builder.mutation({
      query: () => ({
        url: "/users/refresh-token",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useRefreshTokenMutation,
} = usersApi;

import { baseApi } from "./baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (payload) => ({
        url: "/auth/login",
        method: "POST",
        body: payload,
      }),
    }),
    signUp: builder.mutation({
      query: (payload) => {
        return {
          url: "/user/signup",
          method: "POST",
          body: payload,
        };
      },
    }),
    getSingleUser: builder.query({
      query: (email) => {
        return {
          url: `/user/${email}`,
          method: "GET",
        };
      },
    }),
    getUser: builder.query({
      query: () => {
        return {
          url: `/user`,
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useSignUpMutation,
  useGetUserQuery,
  useGetSingleUserQuery,
} = authApi;

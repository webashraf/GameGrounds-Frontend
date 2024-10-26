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
          url: "/auth/signup",
          method: "POST",
          body: payload,
        };
      },
    }),
    getUser: builder.query({
      query: (id) => {
        return {
          url: `/auth/${id}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useLoginMutation, useSignUpMutation, useGetUserQuery } = authApi;

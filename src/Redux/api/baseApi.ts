import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api",
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getFacilities: builder.query({
      query: () => ({ url: "/facility", method: "GET" }),
    }),
    login: builder.mutation({
      query: (payload) => ({
        url: "/auth/login",
        method: "POST",
        body: payload,
      }),
    }),
    signUp: builder.mutation({
      query: (payload) => ({
        url: "/auth/signup",
        method: "POST",
        body: payload,
      }),
    }),
    addFacilities: builder.mutation({
      query: (payload) => ({
        url: "/facility",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const {
  useGetFacilitiesQuery,
  useLoginMutation,
  useSignUpMutation,
  useAddFacilitiesMutation,
} = baseApi;

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
  tagTypes: ["facilities"],
  endpoints: (builder) => ({
    getFacilities: builder.query({
      query: () => ({ url: "/facility", method: "GET" }),
      providesTags: ["facilities"],
    }),
    getSingleFacility: builder.query({
      query: (id) => ({ url: `/facility/${id}`, method: "GET" }),
      providesTags: ["facilities"],
    }),
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
    addFacilities: builder.mutation({
      query: (payload) => ({
        url: "/facility",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["facilities"],
    }),
    updateFacilities: builder.mutation({
      query: ({ data, _id }) => {
        console.log(data);
        return {
          url: `/facility/${_id}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["facilities"],
    }),
    deleteFacilities: builder.mutation({
      query: (_id) => {
        console.log(_id);
        return {
          url: `/facility/${_id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["facilities"],
    }),
    checkAvailability: builder.query({
      query: (query) => {
        console.log(query);
        return {
          url: `/check-availability?date=${query}`,
          method: "GET",
        };
      },
      // invalidatesTags: ["facilities"],
    }),
    createABook: builder.mutation({
      query: (payload) => {
        console.log(payload);
        return {
          url: `/bookings`,
          method: "POST",
          body: payload,
        };
      },
    }),
  }),
});

export const {
  useGetFacilitiesQuery,
  useGetSingleFacilityQuery,
  useLoginMutation,
  useSignUpMutation,
  useAddFacilitiesMutation,
  useUpdateFacilitiesMutation,
  useDeleteFacilitiesMutation,
  useCheckAvailabilityQuery,
  useCreateABookMutation,
} = baseApi;

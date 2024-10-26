/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "./baseApi";

const facilitiesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFacilities: builder.query({
      query: (queries: any) => {
        const params = new URLSearchParams();
        if (queries) {
          queries?.forEach((item: any) => {
            params.append(item?.field, item?.value);
          });
        }
        console.log("params");
        return {
          url: "/facility",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["facilities"],
    }),
    getSingleFacility: builder.query({
      query: (id) => {
        console.log("ID", id);
        return { url: `/facility/${id}`, method: "GET" };
      },
      providesTags: ["facilities"],
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
        return {
          url: `/facility/${_id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["facilities"],
    }),
  }),
});

export const {
  useGetFacilitiesQuery,
  useGetSingleFacilityQuery,
  useAddFacilitiesMutation,
  useUpdateFacilitiesMutation,
  useDeleteFacilitiesMutation,
} = facilitiesApi;

import { baseApi } from "./baseApi";

const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    checkAvailability: builder.query({
      query: (query) => {
        return {
          url: `/check-availability${query}`,
          method: "GET",
        };
      },
      // invalidatesTags: ["facilities"],
    }),
    createABook: builder.mutation({
      query: (payload) => {
        return {
          url: `/bookings`,
          method: "POST",
          body: payload,
        };
      },
    }),
    getAllBookings: builder.query({
      query: () => {
        return {
          url: `/bookings`,
          method: "GET",
        };
      },
    }),
    getAllBookingsByUser: builder.query({
      query: (id) => {
        return {
          url: `/bookings/user/${id}`,
          method: "GET",
        };
      },
      providesTags: ["myBookings"],
    }),
    cancelBooking: builder.mutation({
      query: (id) => {
        return {
          url: `/bookings/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["myBookings"],
    }),
  }),
});

export const {
  useCheckAvailabilityQuery,
  useCreateABookMutation,
  useGetAllBookingsByUserQuery,
  useCancelBookingMutation,
} = bookingApi;

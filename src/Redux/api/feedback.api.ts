import { baseApi } from "./baseApi";

const feedbackApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addFeedback: builder.mutation({
      query: (payload) => ({
        url: "/testimonial-review/create",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const { useAddFeedbackMutation } = feedbackApi;

import { AuthResponse, LoginRequest } from "@/types/admin";
import { apiSlice } from "../services/apiSlice";

export const adminApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    adminLogin: builder.mutation<AuthResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/admin/login",
        method: "POST",
        body: credentials,
      }),
    }),
    uploadImage: builder.mutation({
      query: (data) => ({
        url: `/images/upload`,
        method: "POST",
        body: data,
      }),
    }),
    deleteImage: builder.mutation({
      query: (publicId) => ({
        url: `/system/image`,
        method: "DELETE",
        body: { publicId },
      }),
    }),
    getStatisticsData: builder.query({
      query: () => ({
        url: `/exams/stats`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useAdminLoginMutation,
  useUploadImageMutation,
  useDeleteImageMutation,
  useGetStatisticsDataQuery,
} = adminApi;

import {
  JobCircularDetailsResponse,
  JobCircularFormData,
  JobCircularListResponse,
} from "@/types/jobCircular";
import {
  GetAllJobCategoryResponse,
  JobCategory,
  JobCategoryFormData,
} from "@/types/subject";
import { apiSlice } from "../services/apiSlice";

export const groupApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getJobCircularList: builder.query<JobCircularListResponse, string>({
      query: (query) => `/job-circulars?${query}`,
      providesTags: ["getJobCircularList"],
    }),
    getJobCircularDetails: builder.query<JobCircularDetailsResponse, string>({
      query: (slug) => `/job-circulars/${slug}`,
    }),
    createJobCircular: builder.mutation<
      JobCircularDetailsResponse,
      JobCircularFormData
    >({
      query: (data) => ({
        url: "/job-circulars",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["getJobCategories"],
    }),

    updateJobCircular: builder.mutation<
      JobCircularDetailsResponse,
      { id: number; data: Partial<JobCircularFormData> }
    >({
      query: ({ id, data }) => ({
        url: `/job-circulars/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["getJobCategories"],
    }),

    deleteJobCircular: builder.mutation<
      { success: boolean; message: string },
      number
    >({
      query: (id) => ({
        url: `/job-circulars/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["getJobCircularList"],
    }),

    getJobCategories: builder.query<
      GetAllJobCategoryResponse,
      { page: number; limit: number | string; search?: string }
    >({
      query: ({ page, limit }) =>
        `/job-circulars/category?page=${page}&limit=${limit}`,
      providesTags: ["getJobCategories"],
    }),

    createJobCategory: builder.mutation<
      { success: boolean; message: string },
      JobCategoryFormData
    >({
      query: (data) => ({
        url: "/job-circulars/category",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["getJobCategories"],
    }),

    updateJobCategory: builder.mutation<
      JobCategory,
      {
        id: string;
        data: { _id?: string; category: string; updatedCategory: string };
      }
    >({
      query: ({ id, data }) => ({
        url: `/job-circulars/category/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["getJobCategories"],
    }),

    deleteJobCategory: builder.mutation<
      { success: boolean; message: string },
      string
    >({
      query: (id) => ({
        url: `/job-circulars/category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["getJobCategories"],
    }),
  }),
});

export const {
  useGetJobCircularListQuery,
  useGetJobCircularDetailsQuery,
  useDeleteJobCircularMutation,
  useUpdateJobCircularMutation,
  useCreateJobCircularMutation,
  useGetJobCategoriesQuery,
  useCreateJobCategoryMutation,
  useUpdateJobCategoryMutation,
  useDeleteJobCategoryMutation,
} = groupApi;

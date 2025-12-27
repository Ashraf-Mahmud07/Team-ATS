import {
  CreateNewsCategoryResponse,
  GetAllNewsCategoryResponse,
  GetAllNewsResponse,
  NewsCategory,
  NewsFormData,
  NewsQuestionFormData,
  NewsResponse,
} from "@/types/currentAffairs";
import {
  JobCircularDetailsResponse,
  JobCircularFormData,
} from "@/types/jobCircular";
import { apiSlice } from "../services/apiSlice";

export const currentAffairsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCurrentAffairsList: builder.query<GetAllNewsResponse, string>({
      query: (query) => `/current-affairs?${query}`,
      providesTags: ["getCurrentAffairsList"],
    }),
    getCurrentAffairDetails: builder.query<NewsResponse, number>({
      query: (newsId) => `/current-affairs/${newsId}`,
      providesTags: ["getCurrentAffairsDetails"],
    }),
    createNews: builder.mutation<NewsResponse, NewsFormData>({
      query: (data) => ({
        url: "/current-affairs",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["getCurrentAffairsList"],
    }),

    updateNews: builder.mutation<
      JobCircularDetailsResponse,
      { id: number; data: Partial<NewsFormData> }
    >({
      query: ({ id, data }) => ({
        url: `/current-affairs/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["getCurrentAffairsList"],
    }),

    deleteNews: builder.mutation<{ success: boolean; message: string }, number>(
      {
        query: (id) => ({
          url: `/current-affairs/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["getCurrentAffairsList"],
      }
    ),

    createNewsQuestion: builder.mutation<NewsResponse, NewsQuestionFormData>({
      query: (data) => ({
        url: `/current-affairs/${data.newsId}/questions`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["getCurrentAffairsDetails"],
    }),

    updateNewsQuestion: builder.mutation<
      JobCircularDetailsResponse,
      { newsId: number; questionId: string; data: Partial<JobCircularFormData> }
    >({
      query: ({ newsId, questionId, data }) => ({
        url: `/current-affairs/${newsId}/questions/${questionId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["getCurrentAffairsDetails"],
    }),

    deleteNewsQuestion: builder.mutation<
      { success: boolean; message: string },
      { newsId: number; questionId: string }
    >({
      query: ({ newsId, questionId }) => ({
        url: `/current-affairs/${newsId}/questions/${questionId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["getCurrentAffairsDetails"],
    }),

    getCurrentAffairCategories: builder.query<
      GetAllNewsCategoryResponse,
      { page: number; limit: number | string; search?: string }
    >({
      query: ({ page, limit }) =>
        `/current-affairs/category?page=${page}&limit=${limit}`,
      providesTags: ["getCurrentAffairsCategories"],
    }),

    createCurrentAffairsCategory: builder.mutation<
      CreateNewsCategoryResponse,
      NewsCategory
    >({
      query: (data) => ({
        url: "/current-affairs/category",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["getCurrentAffairsCategories"],
    }),

    updateCurrentAffairsCategory: builder.mutation<
      CreateNewsCategoryResponse,
      {
        id: string;
        data: { _id?: string; category: string; updatedCategory: string };
      }
    >({
      query: ({ id, data }) => ({
        url: `/current-affairs/category/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["getCurrentAffairsCategories"],
    }),

    deleteCurrentAffairsCategory: builder.mutation<
      { success: boolean; message: string },
      string
    >({
      query: (id) => ({
        url: `/current-affairs/category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["getCurrentAffairsCategories"],
    }),
  }),
});

export const {
  useGetCurrentAffairsListQuery,
  useGetCurrentAffairDetailsQuery,
  useCreateNewsMutation,
  useUpdateNewsMutation,
  useDeleteNewsMutation,
  useCreateNewsQuestionMutation,
  useUpdateNewsQuestionMutation,
  useDeleteNewsQuestionMutation,
  useGetCurrentAffairCategoriesQuery,
  useCreateCurrentAffairsCategoryMutation,
  useUpdateCurrentAffairsCategoryMutation,
  useDeleteCurrentAffairsCategoryMutation,
} = currentAffairsApi;

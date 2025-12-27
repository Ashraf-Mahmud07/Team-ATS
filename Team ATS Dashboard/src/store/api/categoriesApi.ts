import { Category, GetAllCategoriesResponse } from "@/types/subject";
import { apiSlice } from "../services/apiSlice";

export const categoriesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query<
      GetAllCategoriesResponse,
      { page: number; limit: number; mainCategory?: string }
    >({
      query: ({ page, limit, mainCategory }) =>
        `/filters/all-categories?page=${page}&limit=${limit}&mainCategory=${mainCategory ?? ""}`,
      providesTags: ["getAllCategories"],
    }),

    createCategory: builder.mutation<
      { success: boolean; message: string },
      Category
    >({
      query: (data) => ({
        url: "/filters/category",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["getAllCategories"],
    }),

    updateCategory: builder.mutation<
      Category,
      { id: string; data: Partial<Category> }
    >({
      query: ({ id, data }) => ({
        url: `/filters/category/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["getAllCategories"],
    }),

    deleteCategory: builder.mutation<
      { success: boolean; message: string },
      string
    >({
      query: (id) => ({
        url: `/filters/category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["getAllCategories"],
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoriesApi;

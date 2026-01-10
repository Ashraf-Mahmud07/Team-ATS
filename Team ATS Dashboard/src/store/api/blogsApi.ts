import {
  BlogCategoryResponse,
  BlogsCategory,
  BlogsCategoryFormData,
  BlogsDetailsResponse,
  BlogsItem,
  BlogsResponse,
  GetAllBlogsResponse,
} from "@/types/blogs";
import { apiSlice } from "../services/apiSlice";

export const blogsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBlogsList: builder.query<GetAllBlogsResponse, string>({
      query: (query) => `/blogs?${query}`,
      providesTags: ["getBlogsList"],
    }),
    getBlogsDetails: builder.query<BlogsResponse, string>({
      query: (slug) => `/blogs/slug/${slug}`,
      providesTags: ["getBlogsDetails"],
    }),
    createBlogs: builder.mutation<BlogsResponse, Partial<BlogsItem>>({
      query: (data) => ({
        url: "/blogs/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["getBlogsList"],
    }),
    updateBlogs: builder.mutation<
      BlogsDetailsResponse,
      { id: string; data: Partial<BlogsItem> }
    >({
      query: ({ id, data }) => ({
        url: `/blogs/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["getBlogsList"],
    }),
    deleteBlogs: builder.mutation<
      { success: boolean; message: string },
      string
    >({
      query: (id) => ({
        url: `/blogs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["getBlogsList"],
    }),
    getBlogsCategories: builder.query<
      BlogCategoryResponse,
      { page: number; limit: number | string; search?: string }
    >({
      query: ({ page, limit }) => `/blog-category?page=${page}&limit=${limit}`,
      providesTags: ["getBlogCategories"],
    }),

    createBlogsCategory: builder.mutation<BlogsCategory, BlogsCategoryFormData>(
      {
        query: (data) => ({
          url: "/blog-category",
          method: "POST",
          body: data,
        }),
        invalidatesTags: ["getBlogCategories"],
      }
    ),
    updateBlogsCategory: builder.mutation<
      BlogsCategory,
      {
        id: string;
        data: {
          _id?: string;
          name: string;
          slug: string;
          updatedCategory: string;
        };
      }
    >({
      query: ({ id, data }) => ({
        url: `/blog-category/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["getBlogCategories"],
    }),

    deleteBlogsCategory: builder.mutation<
      { success: boolean; message: string },
      string
    >({
      query: (id) => ({
        url: `/blog-category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["getBlogCategories"],
    }),
  }),
});

export const {
  useCreateBlogsMutation,
  useGetBlogsListQuery,
  useGetBlogsDetailsQuery,
  useUpdateBlogsMutation,
  useDeleteBlogsMutation,
  useGetBlogsCategoriesQuery,
  useCreateBlogsCategoryMutation,
  useUpdateBlogsCategoryMutation,
  useDeleteBlogsCategoryMutation,
} = blogsApi;

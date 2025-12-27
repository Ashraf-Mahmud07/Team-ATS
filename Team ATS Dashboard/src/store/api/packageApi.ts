import {
  TPackageItem,
  TPackageListResponse,
  TPackageResponse,
} from "@/types/package";
import { apiSlice } from "../services/apiSlice";

export const packageApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPackageList: builder.query<TPackageListResponse, string>({
      query: (query) => `/packages/all?${query}`,
      providesTags: ["getPackageList"],
    }),
    getPackageDetails: builder.query<TPackageResponse, string>({
      query: (id) => `/packages/${id}`,
      providesTags: ["getPackageDetails"],
    }),
    createPackage: builder.mutation<TPackageResponse, Partial<TPackageItem>>({
      query: (data) => ({
        url: "/packages/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["getPackageList"],
    }),
    updatePackage: builder.mutation<
      TPackageResponse,
      { id: string; data: Partial<TPackageItem> }
    >({
      query: ({ id, data }) => ({
        url: `/packages/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["getPackageList"],
    }),
    deletePackage: builder.mutation<
      { success: boolean; message: string },
      string
    >({
      query: (id) => ({
        url: `/packages/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["getPackageList"],
    }),
  }),
});

export const {
  useGetPackageListQuery,
  useGetPackageDetailsQuery,
  useCreatePackageMutation,
  useUpdatePackageMutation,
  useDeletePackageMutation,
} = packageApi;

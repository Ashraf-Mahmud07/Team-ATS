 import { GetAllUnitsResponse, Unit, UnitFormData } from "@/types/subject";
import { apiSlice } from "../services/apiSlice";

export const unitApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUnits: builder.query<
      GetAllUnitsResponse,
      { page: number; limit: number; search?: string; mainCategory?: string }
    >({
      query: ({ page, limit, search, mainCategory }) =>
        `/filters/units?page=${page}&limit=${limit}&search=${search}&mainCategory=${mainCategory ?? ""}`,
      providesTags: ["getUnits"],
    }),

    createUnit: builder.mutation<
      { success: boolean; message: string },
      UnitFormData
    >({
      query: (data) => ({
        url: "/filters/unit",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["getUnits"],
    }),

    updateUnit: builder.mutation<Unit, { id: string; data: Partial<Unit> }>({
      query: ({ id, data }) => ({
        url: `/filters/unit/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["getUnits"],
    }),

    deleteUnit: builder.mutation<{ success: boolean; message: string }, string>(
      {
        query: (id) => ({
          url: `/filters/unit/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["getUnits"],
      }
    ),
  }),
});

export const {
  useGetUnitsQuery,
  useCreateUnitMutation,
  useUpdateUnitMutation,
  useDeleteUnitMutation,
} = unitApi;

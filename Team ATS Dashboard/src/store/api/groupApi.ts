import { GetAllGroupsResponse, Group, GroupFormData } from "@/types/subject";
import { apiSlice } from "../services/apiSlice";

export const groupApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getGroups: builder.query<
      GetAllGroupsResponse,
      { page: number; limit: number; search?: string; mainCategory?: string }
    >({
      query: ({ page, limit, search, mainCategory }) =>
        `/filters/groups?page=${page}&limit=${limit}&search=${search}&mainCategory=${mainCategory ?? ""}`,
      providesTags: ["getGroups"],
    }),

    createGroup: builder.mutation<
      { success: boolean; message: string },
      GroupFormData
    >({
      query: (data) => ({
        url: "/filters/group",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["getGroups"],
    }),

    updateGroup: builder.mutation<Group, { id: string; data: Partial<Group> }>({
      query: ({ id, data }) => ({
        url: `/filters/group/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["getGroups"],
    }),

    deleteGroup: builder.mutation<
      { success: boolean; message: string },
      string
    >({
      query: (id) => ({
        url: `/filters/group/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["getGroups"],
    }),
  }),
});

export const {
  useGetGroupsQuery,
  useCreateGroupMutation,
  useUpdateGroupMutation,
  useDeleteGroupMutation,
} = groupApi;

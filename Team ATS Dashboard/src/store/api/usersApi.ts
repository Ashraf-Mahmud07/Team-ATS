import { GetAdminResponse, GetSingleAdminResponse, GetUsersResponse, IAdmin } from "@/types/users";
import { apiSlice } from "../services/apiSlice";

export const usersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query<GetUsersResponse, string | void>({
      query: (queryString) => ({
        url: `/users?${queryString}`,
        method: "GET",
      }),
    }),
    getAllAdminsAndModerator: builder.query<GetAdminResponse, string | void>({
      query: (queryString) => ({
        url: `/admin/list?${queryString}`,
        method: "GET",
      }),
      providesTags: ["getAdminList"]
    }),
    updateAdminOrModeratorRole: builder.mutation<GetSingleAdminResponse, { id: string, role: string }>({
      query: ({ id, role }) => ({
        url: `/admin/${id}`,
        method: "PUT",
        body: { role: role }
      }),
      invalidatesTags: ["getAdminList"]
    }),
    updateAdminOrModeratorStatus: builder.mutation<GetSingleAdminResponse, { id: string, type: string }>({
      query: ({ id, type }) => ({
        url: `/admin/disabled/${id}`,
        method: "PUT",
        body: { type: type }
      }),
      invalidatesTags: ["getAdminList"]
    }),
    createAdminOrModerator: builder.mutation<GetSingleAdminResponse, Partial<IAdmin>>({
      query: (data) => ({
      url: `/admin/create`,
        method: "POST",
        body: data
      }),
      invalidatesTags: ["getAdminList"]
    }),
  }),
});

export const { useGetAllUsersQuery, useGetAllAdminsAndModeratorQuery, useUpdateAdminOrModeratorRoleMutation, useUpdateAdminOrModeratorStatusMutation, useCreateAdminOrModeratorMutation } = usersApi;

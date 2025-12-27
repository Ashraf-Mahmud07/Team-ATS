import {
  GetAllSubjectsResponse,
  Subject,
  SubjectFormData,
} from "@/types/subject";
import { apiSlice } from "../services/apiSlice";

export const subjectApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSubjects: builder.query<
      GetAllSubjectsResponse,
      { page: number; limit: number; search?: string; mainCategory?: string }
    >({
      query: ({ page, limit, search, mainCategory }) =>
        `/filters/subjects?page=${page}&limit=${limit}&search=${search ?? ""}&mainCategory=${mainCategory ?? ""}`,
      providesTags: ["getSubjects"],
    }),

    createSubject: builder.mutation<
      { success: boolean; message: string },
      SubjectFormData
    >({
      query: (data) => ({
        url: "/filters/subject",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["getSubjects"],
    }),

    updateSubject: builder.mutation<
      Subject,
      { id: string; data: Partial<Subject> }
    >({
      query: ({ id, data }) => ({
        url: `/filters/subject/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["getSubjects"],
    }),

    deleteSubject: builder.mutation<
      { success: boolean; message: string },
      string
    >({
      query: (id) => ({
        url: `/filters/subject/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["getSubjects"],
    }),
  }),
});

export const {
  useGetSubjectsQuery,
  useCreateSubjectMutation,
  useUpdateSubjectMutation,
  useDeleteSubjectMutation,
} = subjectApi;

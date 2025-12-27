import {
  CreateExamResponse,
  ExamFormData,
  GetExamResponse,
} from "@/types/exams";
import { apiSlice } from "../services/apiSlice";

export const examsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getExamsList: builder.query<GetExamResponse, string | void>({
      query: (queryString) => ({
        url: `/exams?${queryString}`,
        method: "GET",
      }),
      providesTags: ["getExamsList"],
    }),
    getExamsDetails: builder.query<CreateExamResponse, string>({
      query: (examId) => ({
        url: `/exams/${examId}`,
        method: "GET",
      }),
      providesTags: ["getExamDetails"],
    }),
    createExam: builder.mutation<CreateExamResponse, ExamFormData>({
      query: (examData) => ({
        url: "/exams",
        method: "POST",
        body: examData,
      }),
      invalidatesTags: ["getExamsList"],
    }),
    updateExam: builder.mutation<
      CreateExamResponse,
      { examData: ExamFormData; examId: string | undefined }
    >({
      query: ({ examData, examId }) => ({
        url: `/exams/${examId}`,
        method: "PUT",
        body: examData,
      }),
      invalidatesTags: ["getExamsList"],
    }),

    deleteExam: builder.mutation<CreateExamResponse, string | undefined>({
      query: (examId) => ({
        url: `/exams/${examId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["getExamsList"],
    }),
  }),
});

export const {
  useGetExamsListQuery,
  useGetExamsDetailsQuery,
  useCreateExamMutation,
  useUpdateExamMutation,
  useDeleteExamMutation,
} = examsApi;

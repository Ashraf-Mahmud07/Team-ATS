import {
  AllQuestionsListResponse,
  CreateExamResponse,
  GetQuestionsResponse,
} from "@/types/exams";
import {
  GetQuestionListResponse,
  QuestionFormData,
  TAllQuestionResponse,
} from "@/types/question";
import { apiSlice } from "../services/apiSlice";

export const questionsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getQuestionList: builder.query<
      GetQuestionListResponse,
      { examId: string; query: string }
    >({
      query: ({ examId, query }) => ({
        url: `/exams/questions/${examId}?${query}`,
      }),
      providesTags: ["getQuestionList"],
    }),
    getAllQuestionList: builder.query<TAllQuestionResponse, string>({
      query: (query) => ({
        url: `/exams/all-questions?${query}`,
      }),
      providesTags: ["getAllQuestionList"],
    }),

    getQuestionDetails: builder.query<
      CreateExamResponse,
      { examId: string; questionId: string }
    >({
      query: ({ examId, questionId }) => ({
        url: `/exams/${examId}/questions/${questionId}`,
        method: "GET",
      }),
      providesTags: ["getQuestionDetails"],
    }),

    createQuestion: builder.mutation<
      CreateExamResponse,
      { questionData: QuestionFormData; examId: string }
    >({
      query: ({ examId, questionData }) => ({
        url: `/exams/${examId}/questions`,
        method: "POST",
        body: questionData,
      }),
      invalidatesTags: ["getQuestionList"],
    }),
    updateQuestion: builder.mutation<
      CreateExamResponse,
      { examId: string; questionId: string; questionData: QuestionFormData }
    >({
      query: ({ examId, questionId, questionData }) => ({
        url: `/exams/${examId}/questions/${questionId}`,
        method: "PUT",
        body: questionData,
      }),
      invalidatesTags: ["getQuestionDetails", "getQuestionList"],
    }),

    deleteQuestion: builder.mutation<
      CreateExamResponse,
      { examId: string; questionId: string }
    >({
      query: ({ examId, questionId }) => ({
        url: `/exams/${examId}/questions/${questionId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["getQuestionList"],
    }),
    getQuestionLastIndex: builder.query<
      { data: number; message: string; success: boolean },
      { examId: string; subject: string }
    >({
      query: ({ examId, subject }) => ({
        url: `/exams/${examId}/last-question/${subject}`,
        method: "GET",
      }),
    }),
    getAllQuestionsBySubject: builder.query<AllQuestionsListResponse, string>({
      query: (query) => ({
        url: `/exams/questions?${query}`,
        method: "GET",
      }),
    }),
    getAllQuestionsByExamAndSubject: builder.query<
      GetQuestionsResponse,
      { subject: string; examId: number }
    >({
      query: ({ subject, examId }) => ({
        url: `/model-test/questions/by-subject/${examId}?subject=${subject}`,
        method: "GET",
      }),
      providesTags: ["getExistingQuestions"],
    }),
  }),
});

export const {
  useGetQuestionListQuery,
  useGetAllQuestionListQuery,
  useCreateQuestionMutation,
  useUpdateQuestionMutation,
  useDeleteQuestionMutation,
  useGetQuestionDetailsQuery,
  useGetQuestionLastIndexQuery,
  useGetAllQuestionsBySubjectQuery,
  useGetAllQuestionsByExamAndSubjectQuery,
} = questionsApi;

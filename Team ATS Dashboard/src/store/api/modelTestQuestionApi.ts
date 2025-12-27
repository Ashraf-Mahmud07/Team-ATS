import { CreateExamResponse } from "@/types/exams";
import { GetQuestionListResponse, QuestionFormData } from "@/types/question";
import { apiSlice } from "../services/apiSlice";

export const modelTestQuestionApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getModelTestQuestionList: builder.query<
      GetQuestionListResponse,
      { examId: string; query: string }
    >({
      query: ({ examId, query }) => ({
        url: `/model-test/questions/${examId}?${query}`,
      }),
      providesTags: ["getModelTestQuestionList"],
    }),

    getModelTestQuestionDetails: builder.query<
      CreateExamResponse,
      { examId: string; questionId: string }
    >({
      query: ({ examId, questionId }) => ({
        url: `/model-test/${examId}/questions/${questionId}`,
        method: "GET",
      }),
      providesTags: ["getQuestionDetails"],
    }),

    createModelTestQuestion: builder.mutation<
      CreateExamResponse,
      {
        questionsData: Partial<QuestionFormData> | QuestionFormData[];
        examId: string;
      }
    >({
      query: ({ examId, questionsData }) => ({
        url: `/model-test/${examId}/questions`,
        method: "POST",
        body: questionsData,
      }),
      invalidatesTags: [
        "getModelTestQuestionList",
        "getModelTestQuestionLastIndex",
        "getExistingQuestions",
      ],
    }),
    updateModelTestQuestion: builder.mutation<
      CreateExamResponse,
      { examId: string; questionId: string; questionData: QuestionFormData }
    >({
      query: ({ examId, questionId, questionData }) => ({
        url: `/model-test/${examId}/questions/${questionId}`,
        method: "PUT",
        body: questionData,
      }),
      invalidatesTags: ["getQuestionDetails", "getModelTestQuestionList"],
    }),

    deleteModelTestQuestion: builder.mutation<CreateExamResponse, string>({
      query: (questionId) => ({
        url: `/model-test/questions/${questionId}`,
        method: "DELETE",
      }),
      invalidatesTags: [
        "getModelTestQuestionList",
        "getModelTestQuestionLastIndex",
        "getExistingQuestions",
      ],
    }),
    getModelTestQuestionLastIndex: builder.query<
      {
        data: { lastSubjectIndex: number; totalQuestions: number };
        message: string;
        success: boolean;
      },
      { examId: string; subject: string }
    >({
      query: ({ examId, subject }) => ({
        url: `/model-test/${examId}/last-question/${subject}`,
        method: "GET",
      }),
      providesTags: ["getModelTestQuestionLastIndex"],
    }),
  }),
});

export const {
  useGetModelTestQuestionListQuery,
  useCreateModelTestQuestionMutation,
  useUpdateModelTestQuestionMutation,
  useDeleteModelTestQuestionMutation,
  useGetModelTestQuestionDetailsQuery,
  useGetModelTestQuestionLastIndexQuery,
} = modelTestQuestionApi;

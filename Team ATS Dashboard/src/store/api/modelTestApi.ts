import { CreateModelTestResponse, GetAllModelTestCategoryResponse, ModelTestCategory } from "@/types/currentAffairs";
import {
  CreateExamResponse,
  ExamFormData,
  GetExamResponse,
} from "@/types/exams";
import { apiSlice } from "../services/apiSlice";

export const examsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getModelTestList: builder.query<GetExamResponse, string | void>({
      query: (queryString) => ({
        url: `/model-test/all?${queryString}`,
        method: "GET",
      }),
      providesTags: ["getModelTestList"],
    }),
    getModelTestExamDetails: builder.query<CreateExamResponse, string>({
      query: (examId) => ({
        url: `/model-test/${examId}`,
        method: "GET",
      }),
      providesTags: ["getModelTestDetails"],
    }),
    createModelTestExam: builder.mutation<CreateExamResponse, ExamFormData>({
      query: (examData) => ({
        url: "/model-test/create",
        method: "POST",
        body: examData,
      }),
      invalidatesTags: ["getModelTestList"],
    }),
    updateModelTest: builder.mutation<
      CreateExamResponse,
      { examData: ExamFormData; examId: string | undefined }
    >({
      query: ({ examData, examId }) => ({
        url: `/model-test/${examId}`,
        method: "PUT",
        body: examData,
      }),
      invalidatesTags: ["getModelTestList"],
    }),

    deleteModelTest: builder.mutation<CreateExamResponse, string | undefined>({
      query: (examId) => ({
        url: `/model-test/${examId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["getModelTestList"],
    }),

    // === Model Test Categories === //
    getModelTestCategories: builder.query<
      GetAllModelTestCategoryResponse,
      { page: number; limit: number | string; mainCategory?: string }
    >({
      query: ({ page, limit, mainCategory }) =>
        `/model-test/category?page=${page}&limit=${limit}&mainCategory=${mainCategory ?? ""}`,
      providesTags: ["getModelTestCategories"],
    }),

    createModelTestCategory: builder.mutation<
      CreateModelTestResponse,
      ModelTestCategory
    >({
      query: (data) => ({
        url: "/model-test/category",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["getModelTestCategories"],
    }),

    updateModelTestCategory: builder.mutation<
      CreateModelTestResponse,
      { id: string; data: Partial<ModelTestCategory> }
    >({
      query: ({ id, data }) => ({
        url: `/model-test/category/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["getModelTestCategories"],
    }),

    deleteModelTestCategory: builder.mutation<
      { success: boolean; message: string },
      string
    >({
      query: (id) => ({
        url: `/model-test/category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["getModelTestCategories"],
    }),
  }),
});

export const {
  useGetModelTestListQuery,
  useGetModelTestExamDetailsQuery,
  useCreateModelTestExamMutation,
  useUpdateModelTestMutation,
  useDeleteModelTestMutation,
  useGetModelTestCategoriesQuery,
  useCreateModelTestCategoryMutation,
  useUpdateModelTestCategoryMutation,
  useDeleteModelTestCategoryMutation,
} = examsApi;

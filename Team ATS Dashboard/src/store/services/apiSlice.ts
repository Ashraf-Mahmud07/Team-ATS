import {
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn, FetchArgs } from "@reduxjs/toolkit/query";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL,
  credentials: "include",
  prepareHeaders: (headers) => {
    if (window.location.pathname.includes("/login")) {
      return headers;
    }

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser?.access_token) {
          headers.set("Authorization", `Bearer ${parsedUser.access_token}`);
        }
      } catch (err) {
        console.error("Failed to parse user from localStorage:", err);
      }
    }

    return headers;
  },
});

const baseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await rawBaseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    localStorage.removeItem("user");
    window.location.href = "/login";
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery,
  tagTypes: [
    "getExamsList",
    "getExamDetails",
    "getQuestionList",
    "getSubjects",
    "getAllCategories",
    "getTopics",
    "getSubTopics",
    "getGroups",
    "getUnits",
    "getQuestionDetails",
    "getJobCategories",
    "getJobCircularList",
    "getCurrentAffairsList",
    "getCurrentAffairsDetails",
    "getCurrentAffairsCategories",
    "getBlogsList",
    "getBlogsDetails",
    "getBlogCategories",
    "getAdminList",
    "getModelTestList",
    "getModelTestDetails",
    "getModelTestQuestionList",
    "getModelTestCategories",
    "getAllQuestionList",
    "getPackageList",
    "getPackageDetails",
    "getOrdersList",
    "getOrderDetails",
    "getModelTestQuestionLastIndex",
    "getExistingQuestions",
  ],
  endpoints: () => ({}),
});

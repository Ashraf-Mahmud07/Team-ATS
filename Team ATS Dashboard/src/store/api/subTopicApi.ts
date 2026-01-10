import { GetAllSubTopicsResponse, SubTopicFormData } from './../../types/subject';
import { apiSlice } from './../services/apiSlice';
const subTopicApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        getSubTopics: builder.query<GetAllSubTopicsResponse, { page: number, limit: number, search?: string, topic?: string }>({
            query: ({ page, limit, search, topic }) => `/filters/sub-topics?page=${page}&limit=${limit}&search=${search ?? ""}&topic=${topic ?? ""}`,

            providesTags: ["getSubTopics"],
        }),
        createSubTopic: builder.mutation<
            { success: boolean; message: string },
            SubTopicFormData
        >
            ({
                query: (data) => ({
                    url: "/filters/sub-topic",
                    method: "POST",
                    body: data,
                }),
                invalidatesTags: ["getSubTopics"],
            }),

        deleteSubTopic: builder.mutation<
            { success: boolean; message: string },
            string
        >({
            query: (id) => ({
                url: `/filters/sub-topic/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["getSubTopics"],
        }),
    }),
});
export const {
    useGetSubTopicsQuery,
    useCreateSubTopicMutation,
    useDeleteSubTopicMutation,
} = subTopicApi;
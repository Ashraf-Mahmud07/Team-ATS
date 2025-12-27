import { GetAllTopicsResponse, Topic, TopicFormData } from './../../types/subject';
import { apiSlice } from './../services/apiSlice';
const topicApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        getTopics: builder.query<GetAllTopicsResponse, { page: number, limit: number, search?: string, subject?: string }>({
            query: ({ page, limit, search, subject }) => `/filters/topics?page=${page}&limit=${limit}&search=${search ?? ""}&subject=${subject ?? ''}`,
            providesTags: ["getTopics"],
        }),
        createTopic: builder.mutation<
            { success: boolean; message: string },
            TopicFormData
        >
            ({
                query: (data) => ({
                    url: "/filters/topic",
                    method: "POST",
                    body: data,
                }),
                invalidatesTags: ["getTopics"],
            }),
        updateTopic: builder.mutation<
            Topic,
            { id: string; data: Partial<Topic> }
        >
            ({
                query: ({ id, data }) => ({
                    url: `/filters/topic/${id}`,
                    method: "PUT",
                    body: data,
                }),
                invalidatesTags: ["getTopics"],
            }),
        deleteTopic: builder.mutation<
            { success: boolean; message: string },
            string
        >({
            query: (id) => ({
                url: `/filters/topic/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["getTopics"],
        }),
    }),
});
export const {
    useGetTopicsQuery,
    useCreateTopicMutation,
    useUpdateTopicMutation,
    useDeleteTopicMutation,
} = topicApi;
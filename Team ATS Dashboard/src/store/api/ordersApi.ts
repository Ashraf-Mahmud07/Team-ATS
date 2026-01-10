import { TOrder, TOrderListResponse, TOrderResponse } from "@/types/package";
import { apiSlice } from "../services/apiSlice";

export const ordersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrdersList: builder.query<TOrderListResponse, string>({
      query: (query) => `/orders/list?${query}`,
      providesTags: ["getOrdersList"],
    }),
    getOrderDetails: builder.query<TOrderResponse, string>({
      query: (id) => `/orders/${id}`,
      providesTags: ["getOrderDetails"],
    }),
    approveOrder: builder.mutation<
      TOrderResponse,
      { id: string; data: Partial<TOrder> }
    >({
      query: ({ id, data }) => ({
        url: `/orders/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["getOrdersList"],
    }),
    deleteOrder: builder.mutation<
      { success: boolean; message: string },
      string
    >({
      query: (id) => ({
        url: `/orders/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["getOrdersList"],
    }),
  }),
});

export const {
  useGetOrdersListQuery,
  useGetOrderDetailsQuery,
  useApproveOrderMutation,
  useDeleteOrderMutation,
} = ordersApi;

import { apiSlice } from './apiSlice';
const ORDERS_URL = '/api/orders';

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (data) => ({
        url: ORDERS_URL,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Order'],
    }),
    getOrder: builder.query({
      query: (orderId) => `${ORDERS_URL}/${orderId}`,
      providesTags: ['Order'],
    }),
    getMyOrders: builder.query({
      query: () => ORDERS_URL,
      providesTags: ['Order'],
    }),
    payOrder: builder.mutation({
      query: ({ orderId, details }) => ({
        url: `${ORDERS_URL}/${orderId}/pay`,
        method: 'PUT',
        body: details,
      }),
      invalidatesTags: ['Order'],
    }),
    getSellerOrders: builder.query({
      query: () => `${ORDERS_URL}/seller/orders`,
      providesTags: ['Order'],
    }),
    updateOrderStatus: builder.mutation({
      query: ({ orderId, status }) => ({
        url: `${ORDERS_URL}/${orderId}/status`,
        method: 'PUT',
        body: { status },
      }),
      invalidatesTags: ['Order'],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderQuery,
  useGetMyOrdersQuery,
  usePayOrderMutation,
  useGetSellerOrdersQuery,
  useUpdateOrderStatusMutation,
} = ordersApiSlice;

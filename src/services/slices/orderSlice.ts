import {
  getOrderByNumberApi,
  getFeedsApi,
  orderBurgerApi,
  getOrdersApi
} from '../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TOrderState = {
  isLoading: boolean;
  order: TOrder | null;
  createdOrder: TOrder | null;
  error: string | null;
};

export const initialState: TOrderState = {
  isLoading: false,
  order: null,
  createdOrder: null,
  error: null
};

export const getOrderByNumber = createAsyncThunk(
  'order/get',
  async (number: number) => getOrderByNumberApi(number)
);

export const createOrder = createAsyncThunk(
  'order/create',
  async (data: string[]) => orderBurgerApi(data)
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.order = null;
    }
  },
  selectors: {
    getIsLoading: (state) => state.isLoading,
    getOrder: (state) => state.order,
    getCreatedOrder: (state) => state.createdOrder
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.error = action.error.message as string;
        state.isLoading = false;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.error = null;
        state.isLoading = false;
        state.createdOrder = action.payload.order;
      })
      .addCase(getOrderByNumber.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.error = action.error.message as string;
        state.isLoading = false;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.error = null;
        state.isLoading = false;
        state.order = action.payload.orders[0];
      });
  }
});

export const { getIsLoading, getOrder, getCreatedOrder } = orderSlice.selectors;
export const { clearOrder } = orderSlice.actions;
export default orderSlice.reducer;

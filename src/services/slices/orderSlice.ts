import { getOrderByNumberApi, orderBurgerApi } from '../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TOrderState = {
  orders: TOrder[];
  // orderByNumberResponse: TOrder | null;
  isLoading: boolean;
  order: TOrder | null;
  error: string | null;
};

export const initialState: TOrderState = {
  orders: [],
  // orderByNumberResponse: null,
  isLoading: false,
  order: null,
  error: null
};

export const getOrderByNumber = createAsyncThunk(
  'order/byNumber',
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
    },
  },
  selectors: {
    getOrderState: (state) => state,
    getIsLoading: (state) => state.isLoading,
    getOrder: (state) => state.order,
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
      state.order = action.payload.order;
    })
      // .addCase(getOrderByNumber.pending, (state) => {
      //   state.error = null;
      //   state.request = true;
      // })
      // .addCase(getOrderByNumber.rejected, (state, action) => {
      //   state.error = action.error.message as string;
      //   state.request = false;
      // })
      // .addCase(getOrderByNumber.fulfilled, (state, action) => {
      //   state.error = null;
      //   state.request = false;
      //   state.orderByNumberResponse = action.payload.orders[0];
      // });
  }
});

export const { getOrderState, getIsLoading, getOrder } = orderSlice.selectors;
export const { clearOrder } = orderSlice.actions;
export default orderSlice.reducer;
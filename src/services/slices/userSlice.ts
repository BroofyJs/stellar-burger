import {
  TRegisterData,
  loginUserApi,
  TLoginData,
  getUserApi,
  getOrdersApi,
  logoutApi,
  updateUserApi,
  registerUserApi
} from '../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { deleteCookie, setCookie } from '../../utils/cookie';
import { TOrder, TUser } from '@utils-types';

type TUserState = {
  isLoading: boolean;
  error: string | undefined;
  userData: TUser | null;
  userOrders: TOrder[];
};

export const initialState: TUserState = {
  isLoading: false,
  error: undefined,
  userData: null,
  userOrders: []
};

export const registerUser = createAsyncThunk(
  'user/register',
  async (registerData: TRegisterData) => {
    const data = await registerUserApi(registerData);

    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);

    return data;
  }
);

export const loginUser = createAsyncThunk(
  'user/login',
  async ({ email, password }: TLoginData) => {
    const data = await loginUserApi({ email, password });

    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);

    return data;
  }
);

export const logoutUser = createAsyncThunk('user/logout', async () => {
  await logoutApi();

  localStorage.clear();
  deleteCookie('accessToken');
});

export const getUser = createAsyncThunk('user/getUser', getUserApi);

export const fetchUserOrders = createAsyncThunk('user/orders', getOrdersApi);

export const updateUser = createAsyncThunk(
  'user/update',
  async (data: Partial<TRegisterData>) => updateUserApi(data)
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  selectors: {
    getError: (state) => state.error,
    getUserData: (state) => state.userData,
    getIsLoading: (state) => state.isLoading,
    getOrders: (state) => state.userOrders
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.error.message as string;
        state.isLoading = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = action.payload.user;
      })
      .addCase(loginUser.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message as string;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.error = undefined;
        state.isLoading = false;
        state.userData = action.payload.user;
      })
      .addCase(getUser.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = action.payload.user;
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message as string;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = undefined;
        state.userData = action.payload.user;
      })
      .addCase(logoutUser.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.userData = null;
      })
      .addCase(fetchUserOrders.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.error = action.error.message as string;
        state.isLoading = false;
        state.userOrders = [];
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.error = undefined;
        state.isLoading = false;
        state.userOrders = action.payload;
      });
  }
});

export const { getUserData, getError, getIsLoading, getOrders } =
  userSlice.selectors;
export default userSlice.reducer;

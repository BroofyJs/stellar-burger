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
  // response: TUser | null;
  // registerData: TRegisterData | null;
  userData: TUser | null;
  // isAuthChecked: boolean;
  // isAuthenticated: boolean;
  // loginUserRequest: boolean;
  userOrders: TOrder[];
};

export const initialState: TUserState = {
  isLoading: false,
  error: undefined,
  // response: null,
  // registerData: null,
  userData: null,
  // isAuthChecked: false,
  // isAuthenticated: false,
  // loginUserRequest: false,
  userOrders: []
};

export const registerUser = createAsyncThunk(
  'user/regUser',
  async (registerData: TRegisterData) => await registerUserApi(registerData)
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ email, password }: TLoginData) => {
    const data = await loginUserApi({ email, password });
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data;
  }
);

export const getUser = createAsyncThunk('user/getUser', getUserApi);

export const fetchUserOrders = createAsyncThunk('user/ordersUser', getOrdersApi);

// export const updateUser = createAsyncThunk(
//   'user/updateUser',
//   async (data: Partial<TRegisterData>) => updateUserApi(data)
// );

export const logoutUser = createAsyncThunk(
  'user/logoutUser', 
  async () => {
    await logoutApi();
    console.log('asdasd')
    localStorage.clear();
    deleteCookie('accessToken');
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // userLogout: (state) => {
    //   state.userData = null;
    // },
    // resetError: (state) => {
    //   state.error = undefined;
    // }
  },
  selectors: {
    getError: (state) => state.error,
    getUserData: (state) => state.userData,
    getIsLoading: (state) => state.isLoading,
    getOrders: (state) => state.userOrders,
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
        // (state.request = true), (state.error = null);
        // state.isAuthChecked = true;
        // state.isAuthenticated = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.error.message as string;
        state.isLoading = false;
        // (state.request = false),
        //   (state.error = action.error.message as string),
        //   (state.isAuthChecked = false);
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        // (state.request = false),
        //   (state.error = null),
        //   (state.response = action.payload.user);
        // state.userData = action.payload.user;
        // state.isAuthChecked = false;
        // state.isAuthenticated = true;
        state.userData = action.payload.user;
      })
      .addCase(loginUser.pending, (state) => {
        // state.loginUserRequest = true;
        state.error = undefined;
        state.isLoading = true;
        // state.isAuthChecked = true;
        // state.isAuthenticated = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        // state.loginUserRequest = false;
        // state.isAuthChecked = false;
        state.isLoading = false;
        state.error = action.error.message as string;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.error = undefined;
        state.isLoading = false;
        // state.loginUserRequest = false;
        // state.isAuthChecked = false;
        // state.isAuthenticated = true;
        state.userData = action.payload.user;
      })
      .addCase(getUser.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
        // state.isAuthenticated = true;
        // state.isAuthChecked = true;
        // state.loginUserRequest = true;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        // state.error = undefined;
        // state.isAuthenticated = false;
        // state.isAuthChecked = false;
        // state.loginUserRequest = false;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        // state.isAuthenticated = true;
        // state.loginUserRequest = false;
        state.isLoading = false;
        state.userData = action.payload.user;
        // state.isAuthChecked = false;
      })
      // .addCase(updateUser.pending, (state) => {
      //   (state.request = true), (state.error = null);
      // })
      // .addCase(updateUser.rejected, (state, action) => {
      //   (state.request = false), (state.error = action.error.message as string);
      // })
      // .addCase(updateUser.fulfilled, (state, action) => {
      //   (state.request = false),
      //     (state.error = null),
      //     (state.response = action.payload.user);
      // })
      .addCase(logoutUser.pending, (state) => {
        // state.isAuthenticated = true;
        // state.isAuthChecked = true;
        state.error = undefined;
        state.isLoading = true;
        // state.request = true;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        // state.isAuthenticated = true;
        // state.isAuthChecked = false;
        // state.error = action.error.message as string;
        // state.request = false;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        // state.isAuthenticated = false;
        // state.isAuthChecked = false;
        // state.error = null;
        // state.request = false;
        state.userData = null;
        // localStorage.clear();
        // deleteCookie('accessToken');
      })
      .addCase(fetchUserOrders.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.error = action.error.message as string;
        state.isLoading = false;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.error = undefined;
        state.isLoading = false;
        state.userOrders = action.payload;
      });
  }
});

// export const { userLogout, resetError } = userSlice.actions;
export const { getUserData, getError, getIsLoading, getOrders } = userSlice.selectors;
export default userSlice.reducer;
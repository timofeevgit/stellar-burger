import {
  TLoginData,
  TRegisterData,
  getOrdersApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  updateUserApi
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder, TUser } from '../../utils/types';
import { deleteCookie, setCookie } from '../../utils/cookie';

export interface UserState {
  isAuthenticated: boolean;
  loginUserRequest: boolean;
  user: TUser | null;
  orders: TOrder[];
  ordersRequest: boolean;
  error: string | null;
}

const initialState: UserState = {
  isAuthenticated: false,
  loginUserRequest: false,
  user: null,
  orders: [],
  ordersRequest: false,
  error: null
};

export const loginUserThunk = createAsyncThunk(
  'authorization/login',
  async (data: TLoginData) =>
    loginUserApi(data).then((data) => {
      setCookie('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      return data.user;
    })
);

export const logoutUserThunk = createAsyncThunk('user/logout', async () =>
  logoutApi().then(() => {
    deleteCookie('accessToken');
    localStorage.removeItem('refreshToken');
  })
);

export const getUserThunk = createAsyncThunk('user/getUser', async () =>
  getUserApi()
);

// todo: remove try{}, catch{}
// export const registerUserThunk = createAsyncThunk()
//   'authorization/register',
//   async (data: TRegisterData, { rejectWithValue }) => {
//     try {
//       const result = await registerUserApi(data);
//       setCookie('accessToken', result.accessToken);
//       localStorage.setItem('refreshToken', result.refreshToken);
//       return result.user;
//     } catch (error) {
//       return rejectWithValue(error as string);
//     }
//   }
// );

export const registerUserThunk = createAsyncThunk(
  'authorization/register',
  async (data: TRegisterData) =>
    registerUserApi(data).then((data) => {
      setCookie('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      return data.user;
    })
);

export const updateUserThunk = createAsyncThunk(
  'user/updateUser',
  async (data: Partial<TRegisterData>) => updateUserApi(data)
);

export const getOrdersThunk = createAsyncThunk('user/getUserOrders', async () =>
  getOrdersApi()
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  selectors: {
    isAuthCheckedSelector: (state) => state.isAuthenticated,
    loginUserRequestSelector: (state) => state.loginUserRequest,
    userNameSelector: (state) => state.user?.name || '',
    userEmailSelector: (state) => state.user?.email || '',
    userSelector: (state) => state.user,
    userOrdersSelector: (state) => state.orders,
    ordersRequestSelector: (state) => state.orders,
    errorSelector: (state) => state.error
  },
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(loginUserThunk.pending, (state) => {
        state.loginUserRequest = true;
        state.error = null;
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.loginUserRequest = false;
        state.error = action.error.message!;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loginUserRequest = false;
        state.isAuthenticated = true;
      })
      .addCase(logoutUserThunk.pending, (state) => {
        state.user = null;
        state.loginUserRequest = false;
        state.isAuthenticated = false;
      })
      .addCase(getUserThunk.pending, (state) => {
        state.loginUserRequest = true;
      })
      .addCase(getUserThunk.rejected, (state, action) => {
        state.user = null;
        state.loginUserRequest = false;
        state.error = action.error.message!;
      })
      .addCase(getUserThunk.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.loginUserRequest = false;
        state.isAuthenticated = true;
      })
      .addCase(registerUserThunk.pending, (state) => {
        state.isAuthenticated = false;
        state.loginUserRequest = true;
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.loginUserRequest = false;
        state.error = action.error.message!;
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loginUserRequest = false;
        state.isAuthenticated = true;
      })
      .addCase(updateUserThunk.pending, (state) => {
        state.loginUserRequest = true;
      })
      .addCase(updateUserThunk.rejected, (state, action) => {
        state.loginUserRequest = false;
        state.error = action.error.message!;
      })
      .addCase(updateUserThunk.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.loginUserRequest = false;
        state.isAuthenticated = true;
      })
      .addCase(getOrdersThunk.pending, (state) => {
        state.ordersRequest = true;
      })
      .addCase(getOrdersThunk.rejected, (state, action) => {
        state.error = action.error.message!;
        state.ordersRequest = false;
      })
      .addCase(getOrdersThunk.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.ordersRequest = false;
      });
  }
});

export const { clearErrors } = userSlice.actions;
export const {
  isAuthCheckedSelector,
  userNameSelector,
  userEmailSelector,
  userSelector,
  loginUserRequestSelector,
  userOrdersSelector,
  ordersRequestSelector,
  errorSelector
} = userSlice.selectors;
export default userSlice.reducer;

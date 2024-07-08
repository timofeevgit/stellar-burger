import reducer, {
  initialState,
  isAuthCheckedSelector,
  loginUserRequestSelector,
  userNameSelector,
  userEmailSelector,
  userSelector,
  userOrdersSelector,
  ordersRequestSelector,
  errorSelector,
  clearErrors,
  loginUserThunk,
  logoutUserThunk,
  getUserThunk,
  registerUserThunk,
  updateUserThunk,
  getOrdersThunk
} from '../userSlice';
import { mockUserStoreData } from '../../mocks/mockData';

describe('Слайс user', () => {
  it('Проверка initialState', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  describe('Проверка селекторов', () => {
    it('isAuthCheckedSelector', () => {
      expect(
        isAuthCheckedSelector({
          user: mockUserStoreData
        })
      ).toBe(mockUserStoreData.isAuthenticated);
    });

    it('loginUserRequestSelector', () => {
      expect(
        loginUserRequestSelector({
          user: mockUserStoreData
        })
      ).toBe(mockUserStoreData.loginUserRequest);
    });

    it('userNameSelector', () => {
      expect(
        userNameSelector({
          user: mockUserStoreData
        })
      ).toBe(mockUserStoreData.user?.name);
    });

    it('userEmailSelector', () => {
      expect(
        userEmailSelector({
          user: mockUserStoreData
        })
      ).toBe(mockUserStoreData.user?.email);
    });

    it('userSelector', () => {
      expect(
        userSelector({
          user: mockUserStoreData
        })
      ).toBe(mockUserStoreData.user);
    });

    it('userOrdersSelector', () => {
      expect(
        userOrdersSelector({
          user: mockUserStoreData
        })
      ).toBe(mockUserStoreData.orders);
    });

    it('ordersRequestSelector', () => {
      expect(
        ordersRequestSelector({
          user: mockUserStoreData
        })
      ).toBe(mockUserStoreData.ordersRequest);
    });

    it('errorSelector', () => {
      expect(
        errorSelector({
          user: mockUserStoreData
        })
      ).toBe(mockUserStoreData.error);
    });
  });

  describe('Проверка редьюсеров', () => {
    it('clearErrors', () => {
      const actual = reducer(
        {
          ...mockUserStoreData,
          error: 'test error'
        },
        clearErrors()
      );
      expect(actual.error).toEqual(null);
    });
  });

  describe('Проверка extraReducers', () => {
    describe('loginUserThunk', () => {
      it('pending', () => {
        const action = { type: loginUserThunk.pending.type };
        const state = reducer(initialState, action);
        expect(state.loginUserRequest).toBe(true);
        expect(state.error).toBe(null);
      });

      it('rejected', () => {
        const action = {
          type: loginUserThunk.rejected.type,
          error: { message: 'Failed to login user' }
        };
        const state = reducer(initialState, action);
        expect(state.loginUserRequest).toBe(false);
        expect(state.error).toBe('Failed to login user');
      });

      it('fulfilled', () => {
        const mockResponse = mockUserStoreData.user;

        const action = {
          type: loginUserThunk.fulfilled.type,
          payload: mockResponse
        };
        const state = reducer(initialState, action);
        expect(state.user).toEqual(mockResponse);
        expect(state.loginUserRequest).toBe(false);
        expect(state.isAuthenticated).toEqual(true);
      });
    });

    describe('logoutUserThunk', () => {
      it('pending', () => {
        const action = { type: logoutUserThunk.pending.type };
        const state = reducer(mockUserStoreData, action);
        expect(state.user).toBe(null);
        expect(state.loginUserRequest).toBe(false);
        expect(state.isAuthenticated).toBe(false);
      });
    });

    describe('getUserThunk', () => {
      it('pending', () => {
        const action = { type: getUserThunk.pending.type };
        const state = reducer(initialState, action);
        expect(state.loginUserRequest).toBe(true);
      });

      it('rejected', () => {
        const action = {
          type: getUserThunk.rejected.type,
          error: { message: 'Failed to get user' }
        };
        const state = reducer(initialState, action);
        expect(state.user).toEqual(null);
        expect(state.loginUserRequest).toBe(false);
        expect(state.error).toBe('Failed to get user');
      });

      it('fulfilled', () => {
        const mockResponse = mockUserStoreData;

        const action = {
          type: getUserThunk.fulfilled.type,
          payload: mockResponse
        };
        const state = reducer(initialState, action);
        expect(state.user).toEqual(mockResponse.user);
        expect(state.loginUserRequest).toBe(false);
        expect(state.isAuthenticated).toEqual(true);
      });
    });

    describe('registerUserThunk', () => {
      it('pending', () => {
        const action = { type: registerUserThunk.pending.type };
        const state = reducer(initialState, action);
        expect(state.isAuthenticated).toBe(false);
        expect(state.loginUserRequest).toBe(true);
      });

      it('rejected', () => {
        const action = {
          type: registerUserThunk.rejected.type,
          error: { message: 'Failed to register user' }
        };
        const state = reducer(initialState, action);
        expect(state.isAuthenticated).toBe(false);
        expect(state.loginUserRequest).toBe(false);
        expect(state.error).toBe('Failed to register user');
      });

      it('fulfilled', () => {
        const mockResponse = mockUserStoreData.user;

        const action = {
          type: registerUserThunk.fulfilled.type,
          payload: mockResponse
        };
        const state = reducer(initialState, action);
        expect(state.user).toEqual(mockResponse);
        expect(state.loginUserRequest).toBe(false);
        expect(state.isAuthenticated).toEqual(true);
      });
    });

    describe('updateUserThunk', () => {
      it('pending', () => {
        const action = { type: updateUserThunk.pending.type };
        const state = reducer(initialState, action);
        expect(state.loginUserRequest).toBe(true);
      });

      it('rejected', () => {
        const action = {
          type: updateUserThunk.rejected.type,
          error: { message: 'Failed to update user' }
        };
        const state = reducer(initialState, action);
        expect(state.loginUserRequest).toBe(false);
        expect(state.error).toBe('Failed to update user');
      });

      it('fulfilled', () => {
        const mockResponse = mockUserStoreData;

        const action = {
          type: updateUserThunk.fulfilled.type,
          payload: {
            user: mockResponse.user
          }
        };
        const state = reducer(initialState, action);
        expect(state.user).toEqual(mockResponse.user);
        expect(state.loginUserRequest).toBe(false);
        expect(state.isAuthenticated).toEqual(true);
      });
    });

    describe('getOrdersThunk', () => {
      it('pending', () => {
        const action = { type: getOrdersThunk.pending.type };
        const state = reducer(initialState, action);
        expect(state.ordersRequest).toBe(true);
      });

      it('rejected', () => {
        const action = {
          type: getOrdersThunk.rejected.type,
          error: { message: 'Failed to get orders' }
        };
        const state = reducer(initialState, action);
        expect(state.error).toBe('Failed to get orders');
        expect(state.ordersRequest).toBe(false);
      });

      it('fulfilled', () => {
        const mockResponse = mockUserStoreData;

        const action = {
          type: getOrdersThunk.fulfilled.type,
          payload: mockResponse.orders
        };
        const state = reducer(initialState, action);
        expect(state.orders).toEqual(mockResponse.orders);
        expect(state.ordersRequest).toBe(false);
      });
    });
  });
});

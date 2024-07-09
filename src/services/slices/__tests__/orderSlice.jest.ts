import reducer, {
  initialState,
  isOrderLoadingSelector,
  orderSelector,
  postOrderBurgerThunk,
  orderSlice
} from '../orderSlice';
import { mockOrderStoreData } from '../../mocks/mockData';
import { configureStore } from '@reduxjs/toolkit';

describe('Слайс order', () => {
  it('Проверка initialState', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  describe('Тест селекторов', () => {
    it('isOrderLoadingSelector', () => {
      expect(
        isOrderLoadingSelector({
          order: mockOrderStoreData
        })
      ).toBe(mockOrderStoreData.isOrderLoading);
    });

    it('orderSelector', () => {
      expect(
        orderSelector({
          order: mockOrderStoreData
        })
      ).toBe(mockOrderStoreData.order);
    });
  });

  describe('Тест extraReducers', () => {
    describe('postOrderBurgerThunk', () => {
      it('pending', () => {
        const action = { type: postOrderBurgerThunk.pending.type };
        const state = reducer(initialState, action);
        expect(state.isOrderLoading).toBe(true);
      });

      it('rejected', () => {
        const action = {
          type: postOrderBurgerThunk.rejected.type,
          error: { message: 'Failed to fetch feeds' }
        };
        const state = reducer(initialState, action);
        expect(state.isOrderLoading).toBe(false);
        expect(state.error).toBe('Failed to fetch feeds');
      });

      it('fulfilled', () => {
        const mockResponse = mockOrderStoreData.order;

        const action = {
          type: postOrderBurgerThunk.fulfilled.type,
          payload: {
            order: mockResponse
          }
        };
        const state = reducer(initialState, action);
        expect(state.isOrderLoading).toBe(false);
        expect(state.order).toEqual(mockResponse);
      });
    });
  });

  describe('Тест clearOrder', () => {
    let store: any;
  
    beforeEach(() => {
      store = configureStore({ reducer });
    });
  
    it('Очистка заказа, перевод состояния загрузки в false', () => {
      store.dispatch(orderSlice.actions.clearOrder());
      const newState = store.getState();
      expect(newState.order).toBeNull();
      expect(newState.isOrderLoading).toBeFalsy();
    });
  });
});

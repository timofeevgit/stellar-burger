import reducer, {
  initialState,
  ordersSelector,
  isFeedsLoadingSelector,
  orderSelector,
  isOrderLoadingSelector,
  totalSelector,
  totalTodaySelector,
  getFeedsThunk,
  getOrderThunk
} from '../feedSlice';
import { mockFeedStoreData } from '../../mocks/mockData';

describe('Слайс ленты', () => {
  it('should handle initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  describe('Проверка селекторов', () => {
    it('should handle ordersSelector', () => {
      expect(
        ordersSelector({
          feed: mockFeedStoreData
        })
      ).toBe(mockFeedStoreData.orders);
    });

    it('isFeedsLoadingSelector', () => {
      expect(
        isFeedsLoadingSelector({
          feed: mockFeedStoreData
        })
      ).toBe(mockFeedStoreData.isFeedsLoading);
    });

    it('orderSelector', () => {
      expect(
        orderSelector({
          feed: mockFeedStoreData
        })
      ).toBe(mockFeedStoreData.order);
    });

    it('isOrderLoadingSelector', () => {
      expect(
        isOrderLoadingSelector({
          feed: mockFeedStoreData
        })
      ).toBe(mockFeedStoreData.isOrderLoading);
    });

    it('totalSelector', () => {
      expect(
        totalSelector({
          feed: mockFeedStoreData
        })
      ).toBe(mockFeedStoreData.total);
    });

    it('totalTodaySelector', () => {
      expect(
        totalTodaySelector({
          feed: mockFeedStoreData
        })
      ).toBe(mockFeedStoreData.totalToday);
    });
  });

  describe('Проверка extraReducers', () => {
    describe('getFeedsThunk', () => {
      it('pending', () => {
        const action = { type: getFeedsThunk.pending.type };
        const state = reducer(initialState, action);
        expect(state.isFeedsLoading).toBe(true);
      });

      it('rejected', () => {
        const action = {
          type: getFeedsThunk.rejected.type,
          error: { message: 'Failed to fetch feeds' }
        };
        const state = reducer(initialState, action);
        expect(state.isFeedsLoading).toBe(false);
        expect(state.error).toBe('Failed to fetch feeds');
      });

      it('fulfilled', () => {
        const mockResponse = {
          orders: mockFeedStoreData.orders,
          total: mockFeedStoreData.total,
          totalToday: mockFeedStoreData.totalToday
        };

        const action = {
          type: getFeedsThunk.fulfilled.type,
          payload: mockResponse
        };
        const state = reducer(initialState, action);
        expect(state.isFeedsLoading).toBe(false);
        expect(state.orders).toEqual(mockResponse.orders);
        expect(state.total).toBe(mockResponse.total);
        expect(state.totalToday).toBe(mockResponse.totalToday);
      });
    });

    describe('getOrderThunk', () => {
      it('pending', () => {
        const action = { type: getOrderThunk.pending.type };
        const state = reducer(initialState, action);
        expect(state.isOrderLoading).toBe(true);
      });

      it('rejected', () => {
        const action = {
          type: getOrderThunk.rejected.type,
          error: { message: 'Failed to fetch order' }
        };
        const state = reducer(initialState, action);
        expect(state.isOrderLoading).toBe(false);
        expect(state.error).toBe('Failed to fetch order');
      });

      it('fulfilled', () => {
        const mockResponse = {
          orders: mockFeedStoreData.orders
        };
        const action = {
          type: getOrderThunk.fulfilled.type,
          payload: mockResponse
        };
        const state = reducer(initialState, action);
        expect(state.isOrderLoading).toBe(false);
        expect(state.order).toEqual(mockResponse.orders[0]);
      });
    });
  });
});

import reducer, {
  initialState,
  ingredientsSelector,
  isIngredientsLoadingSelector,
  getIngredientsThunk
} from '../ingredientsSlice';
import { mockIngridientsStoreData } from '../../mocks/mockData';

describe('Слайс ingridients', () => {
  it('Прверка initialState', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  describe('Прверка селекторов', () => {
    it('ingredientsSelector', () => {
      expect(
        ingredientsSelector({
          ingredients: mockIngridientsStoreData
        })
      ).toBe(mockIngridientsStoreData.ingredients);
    });

    it('isIngredientsLoadingSelector', () => {
      expect(
        isIngredientsLoadingSelector({
          ingredients: mockIngridientsStoreData
        })
      ).toBe(mockIngridientsStoreData.isIngredientsLoading);
    });
  });

  describe('Тест extraReducers', () => {
    describe('getIngredientsThunk', () => {
      it('pending', () => {
        const action = { type: getIngredientsThunk.pending.type };
        const state = reducer(initialState, action);
        expect(state.isIngredientsLoading).toBe(true);
      });

      it('rejected', () => {
        const action = {
          type: getIngredientsThunk.rejected.type,
          error: { message: 'Failed to fetch feeds' }
        };
        const state = reducer(initialState, action);
        expect(state.isIngredientsLoading).toBe(false);
        expect(state.error).toBe('Failed to fetch feeds');
      });

      it('fulfilled', () => {
        const mockResponse = mockIngridientsStoreData.ingredients;

        const action = {
          type: getIngredientsThunk.fulfilled.type,
          payload: mockResponse
        };
        const state = reducer(initialState, action);
        expect(state.isIngredientsLoading).toBe(false);
        expect(state.ingredients).toEqual(mockResponse);
      });
    });
  });
});

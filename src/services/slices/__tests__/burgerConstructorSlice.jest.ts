import { TConstructorIngredient } from '../../../utils/types';
import reducer, {
  initialState,
  addIngredient,
  upIngredient,
  downIngredient,
  removeIngredient,
  clearBurgerConstructor,
  burgerConstructorSelector
} from '../burgerConstructorSlice';
import {
  mockBunData,
  mockIngredientData,
  mockBurgerConstructorStoreData
} from '../../mocks/mockData';
import { v4 as uuidv4 } from 'uuid';

jest.mock('uuid', () => ({
  v4: jest.fn()
}));

const mockedUUID = 'test-uuid';

describe('Слайс конструктора', () => {
  beforeEach(() => {
    (uuidv4 as jest.Mock).mockReturnValue(mockedUUID);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Проверка содерания initialState', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('Проверка содержания burgerConstructorSelector', () => {
    expect(
      burgerConstructorSelector({
        burgerConstructor: mockBurgerConstructorStoreData
      })
    ).toBe(mockBurgerConstructorStoreData.burgerConstructor);
  });

  it('Проверка добавления булки', () => {
    const bun: TConstructorIngredient = {
      ...mockBunData,
      id: mockedUUID
    };
    const actual = reducer(initialState, addIngredient(bun));
    expect(actual.burgerConstructor.bun).toEqual(bun);
    expect(actual.burgerConstructor.ingredients).toEqual([]);
  });

  it('Проверка добавления ингредиента', () => {
    const ingredient: TConstructorIngredient = {
      ...mockIngredientData,
      id: mockedUUID
    };
    const actual = reducer(initialState, addIngredient(ingredient));
    expect(actual.burgerConstructor.bun).toBeNull();
    expect(actual.burgerConstructor.ingredients).toEqual([ingredient]);
  });

  it('Проверка верхнего ингредиента', () => {
    const ingridient1 = {
      ...mockIngredientData,
      id: '1'
    };

    const ingridient2 = {
      ...mockIngredientData,
      id: '2'
    };

    const stateWithIngredients = {
      ...mockBurgerConstructorStoreData,
      burgerConstructor: {
        bun: null,
        ingredients: [ingridient1, ingridient2]
      }
    };

    const actual = reducer(stateWithIngredients, upIngredient(1));
    expect(actual.burgerConstructor.ingredients).toEqual([
      ingridient2,
      ingridient1
    ]);
  });

  it('Проверка нижнего ингредиента', () => {
    const ingridient1 = {
      ...mockIngredientData,
      id: '1'
    };

    const ingridient2 = {
      ...mockIngredientData,
      id: '2'
    };

    const stateWithIngredients = {
      ...mockBurgerConstructorStoreData,
      burgerConstructor: {
        bun: null,
        ingredients: [ingridient1, ingridient2]
      }
    };

    const actual = reducer(stateWithIngredients, downIngredient(0));
    expect(actual.burgerConstructor.ingredients).toEqual([
      ingridient2,
      ingridient1
    ]);
  });

  it('Удаление ингредиента', () => {
    const stateWithIngredients = {
      ...mockBurgerConstructorStoreData,
      burgerConstructor: {
        bun: null,
        ingredients: [mockIngredientData]
      }
    };

    const actual = reducer(
      stateWithIngredients,
      removeIngredient(mockIngredientData)
    );
    expect(actual.burgerConstructor.ingredients).toEqual([]);
  });

  it('Очистка конструктора', () => {
    const actual = reducer(
      mockBurgerConstructorStoreData,
      clearBurgerConstructor()
    );
    expect(actual.burgerConstructor.bun).toBeNull();
    expect(actual.burgerConstructor.ingredients).toEqual([]);
  });
});

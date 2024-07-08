export const mockIngredientData = {
  _id: '643d69a5c3f7b9001cfa0941',
  id: 'mock-ingridient-id-1',
  name: 'Биокотлета из марсианской Магнолии',
  type: 'main',
  proteins: 420,
  fat: 142,
  carbohydrates: 242,
  calories: 4242,
  price: 424,
  image: 'https://code.s3.yandex.net/react/code/meat-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
};

export const mockBunData = {
  _id: '643d69a5c3f7b9001cfa093c',
  id: 'mock-bun-id-1',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
};

export const mockOrderStoreData = {
  order: {
    ingredients: ['test1', 'test2'],
    _id: 'test1',
    status: 'done',
    name: 'Краторный био-марсианский люминесцентный метеоритный бургер',
    createdAt: '2024-07-04T08:36:36.334Z',
    updatedAt: '2024-07-04T08:36:36.710Z',
    number: 44913
  },
  isOrderLoading: false,
  error: null
};

export const mockBurgerConstructorStoreData = {
  burgerConstructor: {
    bun: {
      ...mockBunData,
      id: 'mock-bun-id-1'
    },
    ingredients: [
      {
        ...mockIngredientData,
        id: 'mock-ingridient-id-1',
        name: 'Биокотлета из марсианской Магнолии',
        type: 'main',
        proteins: 420,
        fat: 142,
        carbohydrates: 242,
        calories: 4242,
        price: 424,
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
      },
      {
        ...mockIngredientData,
        id: 'mock-ingridient-id-2',
        name: 'Биокотлета из марсианской Магнолии',
        type: 'main',
        proteins: 420,
        fat: 142,
        carbohydrates: 242,
        calories: 4242,
        price: 424,
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
      },
      {
        ...mockIngredientData,
        id: 'mock-ingridient-id-3',
        name: 'Биокотлета из марсианской Магнолии',
        type: 'main',
        proteins: 420,
        fat: 142,
        carbohydrates: 242,
        calories: 4242,
        price: 424,
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
      }
    ]
  },
  error: null
};

export const mockIngridientsStoreData = {
  ingredients: [
    {
      _id: '643d69a5c3f7b9001cfa093f',
      name: 'Мясо бессмертных моллюсков Protostomia',
      type: 'main',
      proteins: 433,
      fat: 244,
      carbohydrates: 33,
      calories: 420,
      price: 1337,
      image: 'https://code.s3.yandex.net/react/code/meat-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-02-large.png',
      __v: 0
    },
    {
      _id: '643d69a5c3f7b9001cfa0940',
      name: 'Говяжий метеорит (отбивная)',
      type: 'main',
      proteins: 800,
      fat: 800,
      carbohydrates: 300,
      calories: 2674,
      price: 3000,
      image: 'https://code.s3.yandex.net/react/code/meat-04.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-04-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-04-large.png',
      __v: 0
    }
  ],
  isIngredientsLoading: false,
  error: null
};

export const mockUserStoreData = {
  isAuthenticated: false,
  loginUserRequest: false,
  user: {
    name: 'testUser',
    email: 'test@mail.com'
  },
  orders: [
    {
      _id: '66865ee9856777001bb1fbf9',
      ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093d'],
      status: 'done',
      name: 'Флюоресцентный бургер',
      createdAt: '2024-07-04T08:35:53.795Z',
      updatedAt: '2024-07-04T08:35:54.316Z',
      number: 44912
    },
    {
      _id: '66865f14856777001bb1fbfa',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa0940',
        '643d69a5c3f7b9001cfa093c'
      ],
      status: 'done',
      name: 'Краторный био-марсианский люминесцентный метеоритный бургер',
      createdAt: '2024-07-04T08:36:36.334Z',
      updatedAt: '2024-07-04T08:36:36.710Z',
      number: 44913
    }
  ],
  ordersRequest: false,
  error: null
};

export const mockFeedStoreData = {
  orders: [
    {
      _id: '66743957856777001bb1c5b3',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093c'
      ],
      status: 'done',
      name: 'Краторный люминесцентный бургер',
      createdAt: '2024-06-20T14:14:47.088Z',
      updatedAt: '2024-06-20T14:14:47.520Z',
      number: 43528
    },
    {
      _id: '66865ee9856777001bb1fbf9',
      ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093d'],
      status: 'done',
      name: 'Флюоресцентный бургер',
      createdAt: '2024-07-04T08:35:53.795Z',
      updatedAt: '2024-07-04T08:35:54.316Z',
      number: 44912
    },
    {
      _id: '66865f14856777001bb1fbfa',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa0940',
        '643d69a5c3f7b9001cfa093c'
      ],
      status: 'done',
      name: 'Краторный био-марсианский люминесцентный метеоритный бургер',
      createdAt: '2024-07-04T08:36:36.334Z',
      updatedAt: '2024-07-04T08:36:36.710Z',
      number: 44913
    }
  ],
  isFeedsLoading: false,
  order: {
    ingredients: ['test1', 'test2'],
    _id: 'test1',
    status: 'done',
    name: 'Краторный био-марсианский люминесцентный метеоритный бургер',
    createdAt: '2024-07-04T08:36:36.334Z',
    updatedAt: '2024-07-04T08:36:36.710Z',
    number: 44913
  },
  isOrderLoading: false,
  total: 44597,
  totalToday: 60,
  error: null
};

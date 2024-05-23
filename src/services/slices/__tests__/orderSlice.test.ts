import reducer, {
  initialState,
  getOrderByNumber,
  createOrder,
  clearOrder
} from '../orderSlice';

describe('orderSlice', () => {
  const order = {
    ingredients: [
      '643d69a5c3f7b9001cfa093c',
      '643d69a5c3f7b9001cfa0941',
      '643d69a5c3f7b9001cfa093e',
      '643d69a5c3f7b9001cfa093c'
    ],
    _id: '1',
    status: 'done',
    name: 'Краторный био-марсианский люминесцентный бургер',
    createdAt: '2024-05-21T18:12:34.122Z',
    updatedAt: '2024-05-21T18:12:34.488Z',
    number: 200
  };

  it('Очистка заказа', () => {
    const mockState = {
      isLoading: false,
      order,
      createdOrder: order,
      error: null
    };

    const state = reducer(mockState, clearOrder());

    expect(state.order).toEqual(null);
    expect(state.createdOrder).toEqual(null);
  });

  it('getOrderByNumber pending', async () => {
    const action = { type: getOrderByNumber.pending.type };
    const state = reducer(initialState, action);
    expect(state.isLoading).toEqual(true);
    expect(state.error).toEqual(null);
  });

  it('getOrderByNumber rejected', async () => {
    const errorMessage = 'Test message';
    const action = {
      type: getOrderByNumber.rejected.type,
      error: { message: errorMessage }
    };
    const state = reducer(initialState, action);
    expect(state.isLoading).toEqual(false);
    expect(state.error).toEqual(errorMessage);
  });

  it('getOrderByNumber fulfilled', async () => {
    const orders = [
      {
        ingredients: [
          '643d69a5c3f7b9001cfa093c',
          '643d69a5c3f7b9001cfa0941',
          '643d69a5c3f7b9001cfa093e',
          '643d69a5c3f7b9001cfa093c'
        ],
        _id: '1',
        status: 'done',
        name: 'Краторный био-марсианский люминесцентный бургер',
        createdAt: '2024-05-21T18:12:34.122Z',
        updatedAt: '2024-05-21T18:12:34.488Z',
        number: 200
      },
      {
        ingredients: [
          '643d69a5c3f7b9001cfa093c',
          '643d69a5c3f7b9001cfa0941',
          '643d69a5c3f7b9001cfa093e',
          '643d69a5c3f7b9001cfa093c'
        ],
        _id: '2',
        status: 'done',
        name: 'Краторный био-марсианский люминесцентный бургер',
        createdAt: '2024-05-21T18:12:34.122Z',
        updatedAt: '2024-05-21T18:12:34.488Z',
        number: 201
      }
    ];

    const action = {
      type: getOrderByNumber.fulfilled.type,
      payload: { orders }
    };
    const state = reducer(initialState, action);

    expect(state.order).toEqual(orders[0]);
    expect(state.isLoading).toEqual(false);
    expect(state.error).toEqual(null);
  });

  it('createOrder pending', async () => {
    const action = { type: createOrder.pending.type };
    const state = reducer(initialState, action);
    expect(state.isLoading).toEqual(true);
    expect(state.error).toEqual(null);
  });

  it('createOrder rejected', async () => {
    const errorMessage = 'Test message';
    const action = {
      type: createOrder.rejected.type,
      error: { message: errorMessage }
    };
    const state = reducer(initialState, action);
    expect(state.isLoading).toEqual(false);
    expect(state.error).toEqual(errorMessage);
  });

  it('createOrder fulfilled', async () => {
    const action = { type: createOrder.fulfilled.type, payload: { order } };
    const state = reducer(initialState, action);

    expect(state.createdOrder).toEqual(order);
    expect(state.isLoading).toEqual(false);
    expect(state.error).toEqual(null);
  });
});

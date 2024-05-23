import reducer, { initialState, fetchFeeds } from '../feedSlice';

describe('feedSlice', () => {
  it('fetchFeeds pending', async () => {
    const action = { type: fetchFeeds.pending.type };
    const state = reducer(initialState, action);
    expect(state.isLoading).toEqual(true);
    expect(state.error).toEqual(null);
  });

  it('fetchFeeds rejected', async () => {
    const errorMessage = 'Test message';
    const action = {
      type: fetchFeeds.rejected.type,
      error: { message: errorMessage }
    };
    const state = reducer(initialState, action);
    expect(state.isLoading).toEqual(false);
    expect(state.error).toEqual(errorMessage);
  });

  it('fetchFeeds fulfilled', async () => {
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

    const total = 500;
    const totalToday = 300;
    const action = {
      type: fetchFeeds.fulfilled.type,
      payload: { orders, total, totalToday }
    };
    const state = reducer(initialState, action);

    expect(state.orders).toEqual(orders);
    expect(state.total).toEqual(total);
    expect(state.totalToday).toEqual(totalToday);
    expect(state.isLoading).toEqual(false);
    expect(state.error).toEqual(null);
  });
});

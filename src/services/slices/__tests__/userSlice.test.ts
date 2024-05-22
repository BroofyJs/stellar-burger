import reducer, {
  initialState,
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  fetchUserOrders,
  updateUser
} from '../userSlice';
import { type TUser, type TOrder } from '../../../utils/types';

describe('userSlice', () => {
  const user: TUser = {
    email: 'test@test.com',
    name: 'test'
  };

  const orders: TOrder[] = [
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

  it('registerUser pending', async () => {
    const action = { type: registerUser.pending.type };
    const state = reducer(initialState, action);
    expect(state.isLoading).toEqual(true);
    expect(state.error).toEqual(undefined);
  });

  it('registerUser rejected', async () => {
    const errorMessage = 'Test message';
    const action = {
      type: registerUser.rejected.type,
      error: { message: errorMessage }
    };
    const state = reducer(initialState, action);
    expect(state.isLoading).toEqual(false);
    expect(state.error).toEqual(errorMessage);
  });

  it('registerUser fulfilled', async () => {
    const action = {
      type: registerUser.fulfilled.type,
      payload: { user }
    };
    const state = reducer(initialState, action);

    expect(state.userData).toEqual(user);
  });

  it('loginUser pending', async () => {
    const action = { type: loginUser.pending.type };
    const state = reducer(initialState, action);
    expect(state.isLoading).toEqual(true);
    expect(state.error).toEqual(undefined);
  });

  it('loginUser rejected', async () => {
    const errorMessage = 'Test message';
    const action = {
      type: loginUser.rejected.type,
      error: { message: errorMessage }
    };
    const state = reducer(initialState, action);
    expect(state.isLoading).toEqual(false);
    expect(state.error).toEqual(errorMessage);
  });

  it('loginUser fulfilled', async () => {
    const action = {
      type: loginUser.fulfilled.type,
      payload: { user }
    };
    const state = reducer(initialState, action);

    expect(state.userData).toEqual(user);
  });

  it('getUser pending', async () => {
    const action = { type: getUser.pending.type };
    const state = reducer(initialState, action);
    expect(state.isLoading).toEqual(true);
    expect(state.error).toEqual(undefined);
  });

  it('getUser rejected', async () => {
    const errorMessage = 'Test message';
    const action = {
      type: getUser.rejected.type,
      error: { message: errorMessage }
    };
    const state = reducer(initialState, action);
    expect(state.isLoading).toEqual(false);
    expect(state.error).toEqual(errorMessage);
  });

  it('getUser fulfilled', async () => {
    const action = {
      type: getUser.fulfilled.type,
      payload: { user }
    };
    const state = reducer(initialState, action);

    expect(state.userData).toEqual(user);
  });

  it('updateUser pending', async () => {
    const action = { type: updateUser.pending.type };
    const state = reducer(initialState, action);
    expect(state.isLoading).toEqual(true);
    expect(state.error).toEqual(undefined);
  });

  it('updateUser rejected', async () => {
    const errorMessage = 'Test message';
    const action = {
      type: updateUser.rejected.type,
      error: { message: errorMessage }
    };
    const state = reducer(initialState, action);
    expect(state.isLoading).toEqual(false);
    expect(state.error).toEqual(errorMessage);
  });

  it('updateUser fulfilled', async () => {
    const action = {
      type: updateUser.fulfilled.type,
      payload: { user }
    };
    const state = reducer(initialState, action);

    expect(state.userData).toEqual(user);
  });

  it('logoutUser pending', async () => {
    const action = { type: logoutUser.pending.type };
    const state = reducer(initialState, action);
    expect(state.isLoading).toEqual(true);
    expect(state.error).toEqual(undefined);
  });

  it('logoutUser rejected', async () => {
    const errorMessage = 'Test message';
    const action = {
      type: logoutUser.rejected.type,
      error: { message: errorMessage }
    };
    const state = reducer(initialState, action);
    expect(state.isLoading).toEqual(false);
    expect(state.error).toEqual(errorMessage);
  });

  it('logoutUser fulfilled', async () => {
    const action = {
      type: logoutUser.fulfilled.type,
      payload: { user }
    };
    const state = reducer(initialState, action);

    expect(state.userData).toEqual(null);
  });

  it('fetchUserOrders pending', async () => {
    const action = { type: fetchUserOrders.pending.type };
    const state = reducer(initialState, action);
    expect(state.isLoading).toEqual(true);
    expect(state.error).toEqual(undefined);
  });

  it('fetchUserOrders rejected', async () => {
    const errorMessage = 'Test message';
    const action = {
      type: fetchUserOrders.rejected.type,
      error: { message: errorMessage }
    };
    const state = reducer(initialState, action);
    expect(state.isLoading).toEqual(false);
    expect(state.error).toEqual(errorMessage);
    expect(state.userOrders).toEqual([]);
  });

  it('fetchUserOrders fulfilled', async () => {
    const action = {
      type: fetchUserOrders.fulfilled.type,
      payload: orders
    };

    const state = reducer(initialState, action);

    expect(state.userOrders).toEqual(orders);
  });
});

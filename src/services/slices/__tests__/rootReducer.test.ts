import store, { rootReducers } from '../../store';

describe('Root Reducer Test', () => {
  it('Root', () => {
    const action = { type: 'UNKNOWN_ACTION' };
    const state = rootReducers(undefined, action);

    expect(store.getState()).toEqual(state);
  });
});

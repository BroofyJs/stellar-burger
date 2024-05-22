import reducer, { fetchIngredients, initialState } from '../ingredientSlice';

describe('ingredientSlice', () => {
  it('fetchIngredients pending', async () => {
    const action = { type: fetchIngredients.pending.type };
    const state = reducer(initialState, action);
    expect(state.isLoading).toEqual(true);
    expect(state.error).toEqual(null);
  });

  it('fetchIngredients rejected', async () => {
    const errorMessage = 'Test message';
    const action = {
      type: fetchIngredients.rejected.type,
      error: { message: errorMessage }
    };
    const state = reducer(initialState, action);
    expect(state.isLoading).toEqual(false);
    expect(state.error).toEqual(errorMessage);
  });

  it('fetchIngredients fulfilled', async () => {
    const ingredients = [
      {
        _id: '643d69a5c3f7b9001cfa093c',
        name: 'Краторная булка N-200i',
        type: 'bun',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
        __v: 0
      },
      {
        _id: '643d69a5c3f7b9001cfa0941',
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
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
        __v: 0
      }
    ];

    const action = {
      type: fetchIngredients.fulfilled.type,
      payload: ingredients
    };
    const state = reducer(initialState, action);

    expect(state.isLoading).toEqual(false);
    expect(state.ingredients).toEqual(ingredients);
  });
});

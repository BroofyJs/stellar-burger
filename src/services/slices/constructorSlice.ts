import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { TConstructorIngredient, TIngredient } from '../../utils/types';

const randomId = () => crypto.randomUUID();

export interface IBurgerConstructorSliceState {
  constructorItems: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  isLoading: boolean;
  error: string | null;
}

const initialState: IBurgerConstructorSliceState = {
  constructorItems: {
    bun: null,
    ingredients: []
  },
  isLoading: false,
  error: null
};

const constructorSlice = createSlice({
  name: 'constructorBurger',
  initialState,
  reducers: {
    addIngredients: {
      reducer: (state, { payload }: PayloadAction<TConstructorIngredient>) => {
        if (payload.type === 'bun') {
          state.constructorItems.bun = payload;
        } else if (payload.type === 'main' || payload.type === 'sauce') {
          state.constructorItems.ingredients.push(payload);
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: randomId() }
      })
    },
    ingredientsToUp: (state, { payload }: PayloadAction<number>) => {
      const currentIngredient = state.constructorItems.ingredients[payload];

      const neighbourIngredient =
        state.constructorItems.ingredients[payload - 1];

      state.constructorItems.ingredients.splice(
        payload - 1,
        2,
        currentIngredient,
        neighbourIngredient
      );
    },
    ingredientsToDown: (state, { payload }: PayloadAction<number>) => {
      const currentIngredient = state.constructorItems.ingredients[payload];

      const neighbourIngredient =
        state.constructorItems.ingredients[payload + 1];

      state.constructorItems.ingredients.splice(
        payload,
        2,
        neighbourIngredient,
        currentIngredient
      );
    },
    removeIngredient: (
      state,
      { payload }: PayloadAction<TConstructorIngredient>
    ) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (ingredient) => ingredient.id != payload.id
        );
    },
    clearConstructor: (state) => {
      state.constructorItems = initialState.constructorItems;
      state.isLoading = false;
    }
  },
  selectors: {
    getIsLoading: (state) => state.isLoading,
    getConstructorItems: (state) => state.constructorItems,
    getError: (state) => state.error
  }
});

export const { getIsLoading, getConstructorItems, getError } =
  constructorSlice.selectors;
export const {
  addIngredients,
  ingredientsToUp,
  ingredientsToDown,
  removeIngredient,
  clearConstructor
} = constructorSlice.actions;

export default constructorSlice.reducer;

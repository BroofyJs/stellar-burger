import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApi } from '../../utils/burger-api';
import { TIngredient } from '../../utils/types';

type TIngredientsState = {
  isLoading: boolean;
  error: string | null;
  ingredients: TIngredient[];
};

export const initialState: TIngredientsState = {
  isLoading: false,
  error: null,
  ingredients: []
};

export const fetchIngredients = createAsyncThunk(
  'ingredients/getAll',
  getIngredientsApi
);

export const ingredientSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    getBuns: (state) =>
      state.ingredients?.filter((item) => item.type === 'bun') ?? [],
    getMains: (state) =>
      state.ingredients?.filter((item) => item.type === 'main') ?? [],
    getSauces: (state) =>
      state.ingredients?.filter((item) => item.type === 'sauce') ?? [],
    getIsLoading: (state) => state.isLoading,
    getIngredients: (state) => state.ingredients,
    getError: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message as string;
      })
      .addCase(
        fetchIngredients.fulfilled,
        (state, { payload }: PayloadAction<TIngredient[]>) => {
          state.isLoading = false;
          state.ingredients = payload;
        }
      );
  }
});

export const {
  getBuns,
  getMains,
  getSauces,
  getIsLoading,
  getError,
  getIngredients
} = ingredientSlice.selectors;
export default ingredientSlice.reducer;

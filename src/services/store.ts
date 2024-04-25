import { configureStore, combineReducers } from '@reduxjs/toolkit';

import ingredientReducer from './slices/ingredientSlice';
import constructorReducer from './slices/constructorSlice';
import feedReducer from './slices/feedSlice';
import orderReducer from './slices/orderSlice';
import userReducer from './slices/userSlice';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

export const rootReducers = combineReducers({
  ingredients: ingredientReducer,
  constructorBurger: constructorReducer,
  feed: feedReducer,
  order: orderReducer,
  user: userReducer,
});

const store = configureStore({
  reducer: rootReducers,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducers>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;

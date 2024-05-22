import reducer, {
  addIngredients,
  ingredientsToUp,
  ingredientsToDown,
  removeIngredient,
  IBurgerConstructorSliceState
} from '../constructorSlice';
import { TIngredient } from '../../../utils/types';

const bun: TIngredient = {
  _id: '1',
  name: 'Bun',
  type: 'bun',
  proteins: 10,
  fat: 5,
  carbohydrates: 20,
  calories: 200,
  price: 50,
  image: 'bun.png',
  image_mobile: 'bun_mobile.png',
  image_large: 'bun_large.png'
};

const main: TIngredient = {
  _id: '2',
  name: 'Main',
  type: 'main',
  proteins: 20,
  fat: 10,
  carbohydrates: 30,
  calories: 300,
  price: 100,
  image: 'main.png',
  image_mobile: 'main_mobile.png',
  image_large: 'main_large.png'
};

const initialState: IBurgerConstructorSliceState = {
  constructorItems: {
    bun: null,
    ingredients: []
  },
  isLoading: false,
  error: null
};

describe('constructorSlice', () => {
  it('Добавление ингредиента', () => {
    const action = addIngredients(bun);
    const state = reducer(initialState, action);
    expect(state.constructorItems.bun).toEqual({
      ...bun,
      id: action.payload.id
    });
  });

  it('Перемещение начинки наверх', () => {
    const action = addIngredients(main);
    let state = reducer(initialState, action);

    const main2 = { ...main, _id: '3' };
    state = reducer(state, addIngredients(main2));

    state = reducer(state, ingredientsToUp(1));
    expect(state.constructorItems.ingredients[0]._id).toBe('3');
  });

  it('Перемещение начинки вниз', () => {
    const action = addIngredients(main);
    let state = reducer(initialState, action);

    const main2 = { ...main, _id: '3' };
    state = reducer(state, addIngredients(main2));

    state = reducer(state, ingredientsToDown(0));
    expect(state.constructorItems.ingredients[0]._id).toBe('3');
  });

  it('Удаление ингредиента', () => {
    const main2 = { ...main, _id: '3' };
    const actionAddMain = addIngredients(main);
    const actionAddMain2 = addIngredients(main2);

    let state = reducer(initialState, actionAddMain);

    state = reducer(state, actionAddMain2);
    state = reducer(
      state,
      removeIngredient({ ...main2, id: actionAddMain2.payload.id })
    );

    expect(state.constructorItems.ingredients).toHaveLength(1);
    expect(state.constructorItems.ingredients[0]._id).toBe('2');
  });
});

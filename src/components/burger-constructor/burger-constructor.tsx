import { FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector, useDispatch } from '../../services/store';
import {
  getConstructorItems,
  clearConstructor
} from '../../services/slices/constructorSlice';
import {
  createOrder,
  getIsLoading,
  getCreatedOrder,
  clearOrder
} from '../../services/slices/orderSlice';
import { getUserData } from '../../services/slices/userSlice';

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const constructorItems = useSelector(getConstructorItems);
  const orderRequest = useSelector(getIsLoading);
  const orderModalData = useSelector(getCreatedOrder);
  const userData = useSelector(getUserData);

  const onOrderClick = () => {
    if (!userData) {
      navigate('/login', { replace: true });

      return;
    }

    if (!constructorItems?.bun || orderRequest) return;

    const { bun, ingredients } = constructorItems;

    const order: string[] = [
      bun._id,
      ...ingredients.map((ingredient) => ingredient._id),
      bun._id
    ];

    dispatch(createOrder(order));
  };

  const closeOrderModal = () => {
    dispatch(clearOrder());
    dispatch(clearConstructor());

    navigate('/', { replace: true });
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};

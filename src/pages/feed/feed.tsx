import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { fetchUserOrders, getIsLoading, getOrders} from '../../services/slices/userSlice';
import { useSelector, useDispatch } from '../../services/store';
import { useEffect } from 'react';
export const Feed: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector(getOrders);
  const idLoading = useSelector(getIsLoading);

  useEffect(() => {
    dispatch(fetchUserOrders())
  }, [dispatch])

  if (idLoading) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={() => {dispatch(fetchUserOrders())}} />;
};

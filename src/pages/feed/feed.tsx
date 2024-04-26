import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC } from 'react';
import { fetchFeeds, getFeedState } from '../../services/slices/feedSlice';
import { useSelector, useDispatch } from '../../services/store';
import { useEffect } from 'react';

export const Feed: FC = () => {
  const dispatch = useDispatch();

  const state = useSelector(getFeedState);
  const orders = state.orders;
  const isLoading = state.isLoading;

  useEffect(() => {
    dispatch(fetchFeeds());
  }, [dispatch]);

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(fetchFeeds());
      }}
    />
  );
};

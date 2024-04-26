import React from 'react';
import { useSelector } from '../../services/store';
import { getUserData } from '../../services/slices/userSlice';
import { Navigate, useLocation } from 'react-router-dom';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  onlyUnAuth,
  children
}: ProtectedRouteProps) => {
  const user = useSelector(getUserData);
  const location = useLocation();

  if (!user && !onlyUnAuth) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (user && onlyUnAuth) {
    const from = { pathname: '/' };
    return <Navigate replace to={from} />;
  }

  return children;
};

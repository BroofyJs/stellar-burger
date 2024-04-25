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
  // const isAuthChecked = useSelector(isAuthCheckedSelector); // isAuthCheckedSelector — селектор получения состояния загрузки пользователя
  const user = useSelector(getUserData); // userDataSelector — селектор получения пользователя из store
  const location = useLocation();
  const isAuthChecked = true;
  // const user = null;
  
  if (!user && !onlyUnAuth) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (user && onlyUnAuth) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} />;
  }

  return children;
};


// export const ProtectedRoute = ({
//   onlyUnAuth = false,
//   children
// }: ProtectedRouteProps): ReactElement => {
//   const isAuthChecked = useSelector((state) => state.auth.isAuthenticated);
//   const loginRequested = useSelector((state) => state.auth.loginUserRequest);
//   const user = useSelector((state) => state.auth.data.name);
//   const location = useLocation();
//   const from = location.state?.from || { pathname: '/' };
//   const { number } = useParams();

//   if (!isAuthChecked && loginRequested) {
//     return <Preloader />;
//   }

//   if (onlyUnAuth && user) {
//     return <Navigate replace to={from} state={location} />;
//   }

//   if (!onlyUnAuth && !user) {
//     return <Navigate to='/login' state={{ from: location }} />;
//   }

//   return children;
// };
import { FC, ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { AppRoute } from '../../constants';
import { useAppSelector } from '../../hooks/use-redux';
import { selectIsAuthorized } from '../../store/auth-slice';

type PrivateRouteProps = {
  children: ReactElement;
}

const PrivateRoute: FC<PrivateRouteProps> = ({children}) => {
  const isAuthorized = useAppSelector(selectIsAuthorized);
  return isAuthorized ? children : <Navigate to={AppRoute.Login} />;
};

export default PrivateRoute;


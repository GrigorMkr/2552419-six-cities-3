import { FC } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../constants';
import { useAppDispatch } from '../../hooks/use-redux';
import { logoutAction } from '../../store/api-actions';

type AuthorizedNavListProps = {
  user: {
    email: string;
    avatarUrl?: string;
    favoriteCount?: number;
  };
}

const AuthorizedNavList: FC<AuthorizedNavListProps> = ({user}) => {
  const dispatch = useAppDispatch();

  const handleSignOut = () => {
    dispatch(logoutAction());
  };

  return (
    <>
      <li className="header__nav-item user">
        <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
          <div className="header__avatar-wrapper user__avatar-wrapper">
          </div>
          <span className="header__user-name user__name">{user.email}</span>
          {user.favoriteCount !== undefined && user.favoriteCount > 0 && (
            <span className="header__favorite-count">{user.favoriteCount}</span>
          )}
        </Link>
      </li>
      <li className="header__nav-item">
        <button className="header__nav-link" type="button" onClick={handleSignOut}>
          <span className="header__signout">Sign out</span>
        </button>
      </li>
    </>
  );
};

export default AuthorizedNavList;


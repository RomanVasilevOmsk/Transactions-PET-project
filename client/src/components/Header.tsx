import { FC } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaBtc, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../hooks/useAuth';
import { useAppDispatch } from '../store/hooks';
import { logout } from '../store/user/userSlice';
import { removeTokenFromLocalStorage } from '../helpers/localstorage.helper';
import { toast } from 'react-toastify';
import { PAGES } from '../constants/urls';

const Header: FC = () => {
  const isAuth = useAuth();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
    removeTokenFromLocalStorage('token');
    toast.success('You logged out.');
    navigate(PAGES.ROOT);
  };

  return (
    <header className="flex items-center px-4 py-4 shadow-sm bg-slate-800 backdrop-blur-sm">
      <Link to="/">
        <FaBtc size={20} />
      </Link>

      {isAuth && (
        <nav className="ml-auto">
          <ul className="flex items-center gap-5  mr-10">
            <li>
              <NavLink
                to={`${PAGES.ROOT}`}
                className={({ isActive }) => (isActive ? 'text-white ' : 'text-white/50 hover:text-white')}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to={`/${PAGES.TRANSACTIONS}`}
                className={({ isActive }) => (isActive ? 'text-white' : 'text-white/50 hover:text-white')}
              >
                Transactions
              </NavLink>
            </li>
            <li>
              <NavLink
                to={`/${PAGES.CATEGORIES}`}
                className={({ isActive }) => (isActive ? 'text-white' : 'text-white/50 hover:text-white')}
              >
                Categories
              </NavLink>
            </li>
          </ul>
        </nav>
      )}

      {isAuth ? (
        <button className="btn btn-red" onClick={logoutHandler}>
          <span>Lot Out</span>
          <FaSignOutAlt />
        </button>
      ) : (
        <Link to={`/${PAGES.AUTH}`} className="py-2 text-white/50 hover:text-white ml-auto">
          Log In / Sign In
        </Link>
      )}
    </header>
  );
};

export default Header;

// import css from '../CSS/CSS.module.css';
import { logOut } from 'components/redux/auth/Reducer';
// import { getProfileThunk } from 'components/redux/auth/thunk';
import { logout } from 'components/redux/contactsApi';
// import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

export const Header = () => {
  const {token, user: {name, email}} = useSelector(state => state.auth)
  // const { profile, token } = useSelector(state => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const location = useLocation();

  const handleLogin = () => {
    navigate('/login');
  };
  const handleLogout = () => {
    logout(token)
    dispatch(logOut());
  };

  // useEffect(()=>{token && dispatch(getProfileThunk(token))},[token])

  return (
    <div>
      <NavLink to="/"> Home </NavLink>
      <ul>
        {name && <p>{name}</p>}
        <button onClick={token ? handleLogout : handleLogin}>{token ? 'Logout' : 'Login' }</button>
        <NavLink to="/register"> Sign in </NavLink>
      </ul>
    </div>
  );
};

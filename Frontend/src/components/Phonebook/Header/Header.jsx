// import css from '../CSS/CSS.module.css';
import { logOut } from 'components/redux/auth/Reducer';
// import { getProfileThunk } from 'components/redux/auth/thunk';
import { dellToken } from 'components/redux/contactsApi';
// import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

export const Header = () => {
  // const { profile, token } = useSelector(state => state.auth);
  // const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const location = useLocation();

  // const handleLogin = () => {
  //   navigate('/login');
  // };
  // const handleLogout = () => {
  //   dispatch(logOut());
  //   dellToken();
  //   navigate('/');
  // };

  // useEffect(()=>{token && dispatch(getProfileThunk(token))},[token])

  return (
    <div>
      <NavLink to="/"> Home </NavLink>
      <ul>
        <NavLink to="/login"> Login </NavLink>
        <NavLink to="/register"> Sign in </NavLink>
      </ul>
    </div>
  );
};

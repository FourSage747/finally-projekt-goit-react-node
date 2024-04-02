import css from '../CSS/CSS.module.css';
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


  return (
    <div className={css.navigate}>
      {/* <img src="https://finally-projekt-goit-react-node.onrender.com/medical-logo.jpg" alt="" /> */}
      <a href="#">home</a>
      {/* <NavLink to="/"> <img src="../img/pngtree-medical-logo-vector-png-image_6713322.png" alt="" /> </NavLink> */}
      <ul className={css.navigateLink}>
        {name && <p className={css.navigateLinkPar}>{name}</p>}
        <button className={css.navigateLinkButton} onClick={token ? handleLogout : handleLogin}>{token ? 'Logout' : 'Login' }</button>
        <NavLink className={css.navigateLinkButton} to="/register"> Sign in </NavLink>
      </ul>
    </div>
  );
};

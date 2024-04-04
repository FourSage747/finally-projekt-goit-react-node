import css from '../CSS/CSS.module.css';
import { logOut } from 'components/redux/auth/Reducer';
// import { getProfileThunk } from 'components/redux/auth/thunk';
import { logout } from 'components/redux/contactsApi';
// import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import img from '../img/pngtree-medical-logo-vector-png-image_6713322.png'

export const Header = () => {
  const {token, user: {name}} = useSelector(state => state.auth)
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
      {/* <img src={img} alt="" width="100"/> */}
      {/* <a href="#">home</a> */}
      <div>
        <NavLink to="/"> <img src={img} alt="" width="100"/></NavLink>
        <span className={css.navigateSpan}>Medicine Shop</span>
      </div>
      <ul className={css.navigateLink}>
        {name && <p className={css.navigateLinkPar}>{name}</p>}
        <button className={css.navigateLinkButton} onClick={token ? handleLogout : handleLogin}>{token ? 'Logout' : 'Login' }</button>
        {!token && <NavLink className={css.navigateLinkButton} to="/register"> Sign in </NavLink>}
      </ul>
    </div>
  );
};

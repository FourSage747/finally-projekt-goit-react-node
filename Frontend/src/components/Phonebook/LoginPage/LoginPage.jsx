import css from '../CSS/CSS.module.css';
import { loginThunk } from 'components/redux/auth/thunk';
import Notiflix from 'notiflix';
// import { useEffect } from 'react';
// import { login } from "components/redux/contactsApi";
import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

export const LoginPage = () => {
//   const isAuth = useSelector(state => state.auth.token);
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  // useEffect(()=>{isAuth && navigate('/contacts')},[isAuth, navigate])

  const handleSubmit = e => {
    e.preventDefault();
    // login({
    //   email: e.target.elements.email.value,
    //   password: e.target.elements.password.value,
    // }).then((data)=>console.log(data)).catch((error)=>console.log(error))
    dispatch(
      loginThunk({
        email: e.target.elements.email.value,
        password: e.target.elements.password.value,
      })
    )
      .unwrap()
      .then((data) => {
        // navigate('/contacts')
        // dispatch(getProfileThunk(isAuth))
        console.log(data)
      })
      .catch((Payload) =>{
        Notiflix.Notify.failure('Some error')
        console.log(Payload)
      });
  };
  return (
    <div className={css.registerLogin}>
      <form onSubmit={handleSubmit} className={css.registerLoginForm}>
        <h1>Log in</h1>
        <label htmlFor="exampleInputEmail1" className={css.succesOrderLabel}>
          Email
        </label>
        <input
          name="email"
          type="email"
          aria-describedby="emailHelp"
          className={css.succesOrderInput}
          required
        />
        <label htmlFor="exampleInputEmail1" className={css.succesOrderLabel}>
          Password
        </label>
        <input
          name="password"
          type="password"
          aria-describedby="emailHelp"
          className={css.succesOrderInput}
          required
        />
        <ul className={css.registerLoginUL}>
          <Link className={`${css.navigateLinkButton} ${css.logoutLinkButton}`} to="/register">Sign in</Link>
          <button className={`${css.navigateLinkButton} ${css.logoutLinkButton}`} type="submit">Log in</button>
        </ul>
      </form>
    </div>
  );
};

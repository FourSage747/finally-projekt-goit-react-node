import css from '../CSS/CSS.module.css';
import { getProfileThunk, loginThunk } from 'components/redux/auth/thunk';
import Notiflix from 'notiflix';
// import { useEffect } from 'react';
// import { login } from "components/redux/contactsApi";
import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

export const LoginPage = () => {
  const isAuth = useSelector(state => state.auth.token);
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
      .then(() => {
        // navigate('/contacts')
        dispatch(getProfileThunk(isAuth))
      })
      .catch(() => Notiflix.Notify.failure('Some error'));
  };
  return (
    <div className={css.home}>
      <form className={css.login} onSubmit={handleSubmit}>
        <h1>Log in</h1>
        <label htmlFor="exampleInputEmail1" className="form-label">
          Email
        </label>
        <input
          name="email"
          type="email"
          className={css.input}
          aria-describedby="emailHelp"
          required
        />
        <label htmlFor="exampleInputEmail1" className="form-label">
          Password
        </label>
        <input
          name="password"
          type="password"
          className={css.input}
          aria-describedby="emailHelp"
          required
        />
        <ul className={css.ulButton}>
          <Link to="/register">Sign in</Link>
          <button className={css.button} type="submit">Log in</button>
        </ul>
      </form>
    </div>
  );
};

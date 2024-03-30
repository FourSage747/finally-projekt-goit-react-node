import css from '../CSS/CSS.module.css';
import { getProfileThunk, loginThunk } from 'components/redux/auth/thunk';
import { singUp } from 'components/redux/contactsApi';
import Notiflix from 'notiflix';
import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

export const RegisterPage = () => {
  // const navigate = useNavigate();
  const isAuth = useSelector(state => state.auth.token);
  const dispatch = useDispatch();
  const handleSubmit = e => {
    e.preventDefault();
    const newUser = {
      name: e.target.elements.name.value,
      email: e.target.elements.email.value,
      password: e.target.elements.password.value,
    };
    singUp(newUser)
      .then(() => {
        Notiflix.Notify.success('Create succesfuly')
        // navigate('/login');
        dispatch(
          loginThunk({
            email: e.target.elements.email.value,
            password: e.target.elements.password.value,
          })
        )
        .unwrap()
        .then(() => {
          dispatch(getProfileThunk(isAuth))
        })
        .catch(() => Notiflix.Notify.failure('Some error'));
      })
      .catch(()=>Notiflix.Notify.failure('User is not create'));
  };

  return (
    <div className={css.home}>
      <form className={css.login} onSubmit={handleSubmit}>
        <h1>Sign in</h1>
        <label htmlFor="exampleInputEmail1" className="form-label">
          Name
        </label>
        <input
          name="name"
          type="text"
          className={css.input}
          aria-describedby="emailHelp"
          required
        />
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
          <Link to="/login">Login</Link>
          <button  className={css.button} type="submit">Sign in</button>
        </ul>
      </form>
    </div>
  );
};

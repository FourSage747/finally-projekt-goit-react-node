import css from '../CSS/CSS.module.css';
import { loginThunk } from 'components/redux/auth/thunk';
import { singUp } from 'components/redux/contactsApi';
import Notiflix from 'notiflix';
import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

export const RegisterPage = () => {
  // const navigate = useNavigate();
//   const isAuth = useSelector(state => state.auth.token);
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
        dispatch(
          loginThunk({
            email: e.target.elements.email.value,
            password: e.target.elements.password.value,
          })
        )
        .unwrap()
        .then(() => {
        //   dispatch(getProfileThunk(isAuth))
            console.log("Succes")
        })
        .catch(() => Notiflix.Notify.failure('Some error'));
      })
      .catch(()=>Notiflix.Notify.failure('User is not create'));
  };

  return (
    <div className={css.registerLogin}>
      <form onSubmit={handleSubmit} className={css.registerLoginForm}>
        <h1>Sign in</h1>
        <label htmlFor="exampleInputEmail1" className={css.succesOrderLabel}>
          Name
        </label>
        <input
          name="name"
          type="text"
          aria-describedby="emailHelp"
          className={css.succesOrderInput}
          required
        />
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
          <Link className={`${css.navigateLinkButton} ${css.logoutLinkButton}`} to="/login">Login</Link>
          <button className={`${css.navigateLinkButton} ${css.logoutLinkButton}`} type="submit">Sign in</button>
        </ul>
      </form>
    </div>
  );
};

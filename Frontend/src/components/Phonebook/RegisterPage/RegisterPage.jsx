// import css from '../CSS/CSS.module.css';
import { loginThunk } from 'components/redux/auth/thunk';
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
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Sign in</h1>
        <label htmlFor="exampleInputEmail1" className="form-label">
          Name
        </label>
        <input
          name="name"
          type="text"
          aria-describedby="emailHelp"
          required
        />
        <label htmlFor="exampleInputEmail1" className="form-label">
          Email
        </label>
        <input
          name="email"
          type="email"
          aria-describedby="emailHelp"
          required
        />
        <label htmlFor="exampleInputEmail1" className="form-label">
          Password
        </label>
        <input
          name="password"
          type="password"
          aria-describedby="emailHelp"
          required
        />
        <ul>
          <Link to="/login">Login</Link>
          <button type="submit">Sign in</button>
        </ul>
      </form>
    </div>
  );
};

import css from '../CSS/CSS.module.css'
import { deleteProducts, shoppingCart, plus, minus } from 'components/redux/task/Reducer';
import { getProductsThunk, postOrderThunk } from 'components/redux/task/thunk';
import Notiflix from 'notiflix';
import { useEffect, useState } from 'react';
import { ColorRing } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

export const Home = () => {
  const [checkedToken, setCheckedToken] = useState(false);
  const [buttonBuy, setbuttonBuy] = useState(true);
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const { isLoading, items } = useSelector(state => state.products.products);
  const {shopping} = useSelector(state => state.products)
  const {token, user: {name, email}} = useSelector(state => state.auth)
  const BASE_URL = "https://finally-projekt-goit-react-node.onrender.com"
  const [formData, setFormData] = useState({
    name: name ? name : '',
    email: email ? email : '',
    number: '',
  });

  useEffect(() => {
    dispatch(getProductsThunk())
      .unwrap()
      .then(data => console.log(data))
      .catch(err => console.log(err));
  }, [dispatch]);

  const handleAdd = (id) => {
    const item = items.find(product => product._id === id)
    const isInCart = shopping.some(cartItem => cartItem._id === id);
    if (isInCart) {
      dispatch(plus(id))
    }
    else {
      const newOrder = {
        ...item,
        quantity: 1
      }
      dispatch(shoppingCart(newOrder))
    }
  }
  const handleRemove = (id) => {
    const isInCart = shopping.find(cartItem => cartItem._id === id);
    if (isInCart.quantity === 1) {
      dispatch(deleteProducts(id))
    }
    else {
      dispatch(minus(id))
    }
  }

  const totalAmount = shopping.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);

  const handleCheckToken = () => {
    setCheckedToken(true);
    setbuttonBuy(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, number } = formData;
    if (!name||!email||!number) {
      Notiflix.Notify.failure('Each field must be filled')
    }
    else {
      const newOrder = {
        name: name,
        email: email,
        number: number,
        order: shopping.map(item => ({
          name: item.name,
          price: item.price,
          quantity: item.quantity
        }))
      }
      dispatch(postOrderThunk(newOrder))
      .unwrap()
      .then(()=>Notiflix.Notify.success('Your order has been accepted'))
      .catch(()=>Notiflix.Notify.failure('Some error'))
      // setFormData({
      //   name: '',
      //   email: '',
      //   number: '',
      // })
      setCheckedToken(false);
      setbuttonBuy(true);
    }
  };

  const onWrapperClick = event => {
    if (event.target.classList.contains(css.succesOrder)) {
      setCheckedToken(false);
      setbuttonBuy(true);
    } 
      
  };


  useEffect(() => {
    const onKeydownEsc = e => {
      if (e.code === 'Escape') {
        setCheckedToken(false);
        setbuttonBuy(true);
      }
    };
    if (shopping.length === 0 ) {
      setCheckedToken(false);
      setbuttonBuy(true);
    }
    window.addEventListener('keydown', onKeydownEsc);
    return () => {
      window.removeEventListener('keydown', onKeydownEsc);
    };
  }, [checkedToken, shopping]);

  return (
    <>
      {isLoading && (
        <ColorRing
          visible={true}
          height="150"
          width="150"
          ariaLabel="color-ring-loading"
          wrapperStyle={{}}
          wrapperClass={css.colorringwrapper}
          colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
        />
      )}
      {!isLoading && items && items.length > 0 && (
        <ul className={css.listItem}>
          {items.map(el => {
              const isInCart = shopping.some(item => item._id === el._id);
              return (
                <li className={css.item} key={el._id} id={el._id}>
                    <img src={`${BASE_URL}/${el.imageURL}`} width="100" alt="" />
                    <span className={css.itemSpan}>{el.name}</span>
                    <p className={css.itemPar}>price: ${el.price}</p>
                    <div className={css.itemDiv}>
                      <button className={`${css.itemButton} ${css.add}`} type="button" onClick={() => handleAdd(el._id)}>Add</button>
                      <span className={css.itemSpan}>{isInCart && shopping.find(sh => sh._id === el._id).quantity}</span>
                      {isInCart && <button className={`${css.itemButton} ${css.remove}`} type="button" onClick={() => handleRemove(el._id)}>Remove</button>}
                    </div>
                </li>
              );
            })}
        </ul>
      )}
      <div className={`${css.totalAmount} ${shopping.length > 0 && buttonBuy ? css.render : css.dont}`}>
        <span className={css.totalAmountSpan}>{totalAmount}$</span>
        <button className={css.totalAmountButton} type="button" onClick={handleCheckToken}>buy</button>
      </div>
      {token && checkedToken && <div className={css.succesOrder} onClick={onWrapperClick}>
        <div className={css.succesOrderWindow}>
          <div className={css.succesOrderDiv}>
            <form className={css.succesOrderForm}>
              <h1>Order</h1>
              <label htmlFor="exampleInputEmail1" className={css.succesOrderLabel}>
                Name
              </label>
              <input
                name="name"
                type="text"
                className={css.succesOrderInput}
                aria-describedby="emailHelp"
                required
                value={name}
                onChange={handleChange} 
              />
              <label htmlFor="exampleInputEmail1" className={css.succesOrderLabel}>
                Email
              </label>
              <input
                name="email"
                type="text"
                className={css.succesOrderInput}
                aria-describedby="emailHelp"
                required
                value={email}
                onChange={handleChange} 
              />
              <label htmlFor="exampleInputEmail1" className={css.succesOrderLabel}>
                Number
              </label>
              <input
                name="number"
                type="text"
                className={css.succesOrderInput}
                aria-describedby="emailHelp"
                required
                onChange={handleChange} 
              />
            </form>
            <ul className={`${css.listItem} ${css.succesOrderUl}`}>
              {shopping.map(el => {
                  // const isInCart = shopping.some(item => item._id === el._id);
                  return (
                    <li className={css.item} key={el._id} id={el._id}>
                        <img src={`${BASE_URL}/${el.imageURL}`} width="100" alt="" />
                        <span className={css.itemSpan}>{el.name}</span>
                        <p className={css.itemPar}>price: ${el.price * el.quantity}</p>
                        <div className={css.itemDiv}>
                          {/* <button type="button" onClick={() => handleAdd(el._id)}>Add</button> */}
                          <span className={css.itemSpan}>{el.quantity}</span>
                          <button className={`${css.itemButton} ${css.remove}`} type="button" onClick={() => handleRemove(el._id)}>Remove</button>
                        </div>
                    </li>
                  );
                })}
            </ul>
          </div>
          <button className={`${css.navigateLinkButton} ${css.logoutLinkButton}`} type="submit" onClick={handleSubmit}>Submit</button>
        </div>
      </div>}
      {!token && checkedToken && <div className={css.succesOrder} onClick={onWrapperClick}>
        <div className={`${css.succesOrderWindow} ${css.logoutOrderWindow}`}>
          <h2>You are not logged in</h2>
          <p>please login</p>
          <Link className={`${css.navigateLinkButton} ${css.logoutLinkButton}`} to="/login">Log in</Link>
          <Link className={`${css.navigateLinkButton} ${css.logoutLinkButton}`} to="/register">Sign in</Link>
        </div>
      </div>}
    </>
  );
};

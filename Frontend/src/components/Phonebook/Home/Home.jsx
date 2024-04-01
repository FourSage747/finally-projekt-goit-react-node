// import css from '../CSS/CSS.module.css'
import { deleteProducts, shoppingCart, plus, minus } from 'components/redux/task/Reducer';
import { getProductsThunk } from 'components/redux/task/thunk';
import { useEffect } from 'react';
import { ColorRing } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
// import { deleteProducts, shoppingCart } from "./redux/Reducer";

export const Home = () => {
  const dispatch = useDispatch();
  const { isLoading, items } = useSelector(state => state.products.products);
  const {shopping} = useSelector(state => state.products)
  const BASE_URL = "https://finally-projekt-goit-react-node.onrender.com"

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

  return (
    <>
      {isLoading && (
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="color-ring-loading"
          wrapperStyle={{}}
          wrapperClass="color-ring-wrapper"
          colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
        />
      )}
      {!isLoading && items && items.length > 0 && (
        <ul>
          {items.map(el => {
              const isInCart = shopping.some(item => item._id === el._id);
              return (
                <li key={el._id} id={el._id}>
                    <img src={`${BASE_URL}/${el.imageURL}`} width="100" alt="" />
                    <span>{el.name}</span><br />
                    <p>price: ${el.price}</p><br />
                    <button type="button" onClick={() => handleAdd(el._id)}>Add</button>
                    <span>{isInCart && shopping.find(sh => sh._id === el._id).quantity}</span>
                    {isInCart && <button type="button" onClick={() => handleRemove(el._id)}>Remove</button>}
                </li>
              );
            })}
        </ul>
      )}
      <div>
        <span>{totalAmount}$</span>
        <button type="button">buy</button>
      </div>
    </>
  );
};

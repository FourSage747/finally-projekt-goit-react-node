// import css from '../CSS/CSS.module.css'
import { getProductsThunk } from 'components/redux/task/thunk';
import { useEffect } from 'react';
import { ColorRing } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';

export const Home = () => {
  const dispatch = useDispatch();
  const { isLoading, items } = useSelector(state => state.products.products);
  const BASE_URL = "https://finally-projekt-goit-react-node.onrender.com"

  useEffect(() => {
    dispatch(getProductsThunk())
      .unwrap()
      .then(data => console.log(data))
      .catch(err => console.log(err));
  }, [dispatch]);

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
      {!isLoading && (
        <ul>
          {items &&
            items.map(el => (
              <li key={el._id} id={el._id}>
                <img src={`${BASE_URL}/${el.imageURL}`} width="100" alt="" />
                {el.name}
              </li>
            ))}
        </ul>
      )}
    </>
  );
};

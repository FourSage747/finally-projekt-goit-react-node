import css from '../CSS/CSS.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { Contacts } from './Contacts';
// import { deleteContacts } from "components/redux/Reducer";
// import { deleteContactsThunk, getContactsThunk } from 'components/redux/thunk';
import { useEffect } from 'react';
// import { filterSelector } from 'components/redux/selector';
import { ColorRing } from 'react-loader-spinner';
import { deleteContactsThunk, getContactsThunk } from 'components/redux/task/thunk';
import { filterSelector } from 'components/redux/task/selector';

export const ContactsList = () => {
  //   const { filter } = useSelector(state => state.contacts);
  const {token} = useSelector((state)=>state.auth)
  const { isLoading } = useSelector(state => state.contacts.contacts);
  const filterContacts = useSelector(filterSelector);
  // const { items } = useSelector(state => state.contacts.contacts);

  const dispatch = useDispatch();

  const handDelete = id => {
    dispatch(deleteContactsThunk(id));
  };

  useEffect(() => {
    token && dispatch(getContactsThunk(token)).unwrap().then((data)=>console.log(data)).catch((err)=>console.log(err));
  }, [token, dispatch]);

  return (
    <>
      {isLoading && <ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="color-ring-loading"
        wrapperStyle={{}}
        wrapperClass="color-ring-wrapper"
        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
      />}
      {!isLoading && <ul className={css.contacts}>
        {filterContacts && filterContacts.map(el => (
          <Contacts
            key={el.id}
            id={el.id}
            name={el.name}
            number={el.number}
            handDelete={handDelete}
          />
        ))}
      </ul>}
    </>
  );
};

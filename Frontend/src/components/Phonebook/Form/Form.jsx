import css from '../CSS/CSS.module.css';
import { nanoid } from '@reduxjs/toolkit';
import { addContactsThunk } from 'components/redux/task/thunk';
// import { creatContacts } from 'components/redux/Reducer';
// import { addContactsThunk } from 'components/redux/thunk';
import { useDispatch, useSelector } from 'react-redux';


export const Form = () => {
  
  const { items } = useSelector((state) => state.contacts.contacts);
  const dispatch = useDispatch();

  const onClick = (e) => {
    e.preventDefault();
    const form = e.target;
    const {name, number} = e.target.elements;
    if (!name.value.trim() || !number.value.trim()) {
      return form.reset();
    }

    if (items) {
      const isAlredyContacts = items.find(el => el.name === name.value);
      if (isAlredyContacts) return alert(`${name.value} is alredy in contacts.`);
    }

    const newContacts = {
      name: name.value,
      number: number.value,
      id: nanoid(),
    }
    dispatch(addContactsThunk(newContacts))
    form.reset();
  };

    return (
      <form onSubmit={onClick}>
        <h2>Phonebook</h2>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Name
          </label>
          <input
            name="name"
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Number
          </label>
          <input
            name="number"
            type="text"
            className="form-control"
            id="exampleInputPassword1"
            required
          />
        </div>
        <button
          type="submit"
          className={css.button}
        >
          Add contact
        </button>
      </form>
      
    );
}

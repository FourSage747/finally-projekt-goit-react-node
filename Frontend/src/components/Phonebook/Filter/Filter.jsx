import css from '../CSS/CSS.module.css';
// import { setFilter } from "components/redux/Reducer";
import { setFilter } from "components/redux/task/Reducer";
import { useDispatch } from "react-redux";

export const Filter = () => {

    const dispatch = useDispatch();

    const handleFilter = ({ target: {value} }) => {
        dispatch(setFilter(value));
    };

    return (
      <div className={css.filter}>
        <h2>Contacts</h2>
        <h4>Find contacts by name</h4>
        <input
          name="filter"
          type="text"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          onChange={handleFilter}
        />
      </div>
    );
}

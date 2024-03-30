import css from '../CSS/CSS.module.css';
export const Contacts = ({id, name, number, handDelete}) => {
    return (
        <li className={css.contactsLi}>{name}: {number} <button className={css.button} type="button" onClick={()=>handDelete(id)}>Delete</button></li>
    )
}
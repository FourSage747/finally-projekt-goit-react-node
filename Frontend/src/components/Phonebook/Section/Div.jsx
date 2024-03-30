import css from '../CSS/CSS.module.css';
export const Div = ({ children }) => {
    return (
        <div className={css.contactBook}>
            {children}
        </div>
    );
};
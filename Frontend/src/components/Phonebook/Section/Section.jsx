import css from '../CSS/CSS.module.css';
export const Section = ({ children }) => {
    return (
        <div className={css.home}>
            {children}
        </div>
    );
};
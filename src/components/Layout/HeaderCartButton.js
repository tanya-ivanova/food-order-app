import { useEffect, useState } from 'react';
import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../../store/ui-slice';

const HeaderCartButton = (props) => {
    const dispatch = useDispatch();

    const cartQuantity = useSelector(state => state.cart.totalQuantity);
    const cartItems = useSelector(state => state.cart.items);

    const [buttonIsHighlighted, setButtonIsHighlighted] = useState(false);    

    const btnClasses = `${classes.button} ${buttonIsHighlighted ? classes.bump : ''}`;

    useEffect(() => {
        if(cartItems.length === 0) {
            return;
        }
        setButtonIsHighlighted(true);

        const timer = setTimeout(() => {
            setButtonIsHighlighted(false);
        }, 300);

        return () => {
            clearTimeout(timer);
        };
    }, [cartItems]);

    const toggleCartHandler = () => {
        dispatch(uiActions.toggle());
    };

    return (
        <button className={btnClasses} onClick={toggleCartHandler}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>{cartQuantity}</span>
        </button>
    );
};

export default HeaderCartButton;
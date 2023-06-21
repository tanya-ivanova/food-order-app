import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../../store/ui-slice';
import CartItem from './CartItem';
import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import Checkout from './Checkout';
import { cartActions } from '../../store/cart-slice';

const Cart = props => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const totalAmount = useSelector(state => state.cart.totalAmount);  

  const totalPriceAmount = `$${totalAmount.toFixed(2)}`;
  const hasItems = cartItems.length > 0;

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);

    await fetch('https://food-order-app-68942-default-rtdb.europe-west1.firebasedatabase.app/orders.json', {
      method: 'POST',
      body: JSON.stringify({
        user: userData,
        orderedItems: cartItems
      })
    });

    setIsSubmitting(false);
    setDidSubmit(true);
    dispatch(cartActions.clearCart());
  };

  const toggleCartHandler = () => {
    dispatch(uiActions.toggle());
  };

  const cartItemsUI = (
    <ul className={classes["cart-items"]}>
      {cartItems.map((item) =>
        <CartItem
          key={item.id}
          id={item.id}
          name={item.name}
          quantity={item.quantity}
          total={item.totalPrice}
          price={item.price}          
        />
      )}</ul>)

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes['button--alt']} onClick={toggleCartHandler}>Close</button>
      {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
    </div>
  );

  const cartModalContent = (
    <>
      {cartItemsUI}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalPriceAmount}</span>
      </div>
      {isCheckout && <Checkout onConfirm={submitOrderHandler}/>}
      {!isCheckout && modalActions}
    </>
  );

  const isSubmittingModalContent = (
    <p>Sending order data...</p>
  );

  const didSubmitModalContent = (
    <>
      <p>Successfully sent the order!</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={toggleCartHandler}>Close</button>
      </div>
    </>
  );

  return (
    <Modal>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  )
}

export default Cart

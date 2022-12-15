import React, { useContext, useState } from 'react';
import classes from './Cart.module.css';
import { Modal } from '../UI/Modal';
import { CartContext } from '../../Store/Cart-Context';
import CartItem from './CartItem';
import Checkout from './Checkout';

export const Cart = (props) => {
  const cartCTX = useContext(CartContext);
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const totalAmount = `₹  ${cartCTX.totalAmount.toFixed(2)}`;
  const hasItems = cartCTX.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCTX.removeItem(id);
  };

  const cartItemAddHandler = (itm) => {
    cartCTX.addItem({ ...itm, amount: 1 });
  };

  const orderHandlers = (itm) => {
    setIsCheckout(true);
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmitted(true);
    await fetch(
      'https://food-order-app-9b789-default-rtdb.asia-southeast1.firebasedatabase.app/order.json',
      {
        method: 'POST',
        body: JSON.stringify({
          user: userData,
          orderItems: cartCTX.items,
        }),
      }
    );
    setIsSubmitted(false);
    setDidSubmit(true);
    cartCTX.clearCart();
  };

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCTX.items.map((item) => (
        //  <li key={item.id}>
        //    <h3>{item.name}</h3>
        // </li>
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const moduleAction = (
    <div className={classes.actions}>
      <button className={classes['button--alt']} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandlers}>
          Order Now
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>

      {isCheckout && (
        <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />
      )}
      {!isCheckout && moduleAction}
    </>
  );

  const isSubmittingModalContent = <h4>Sending Order Data...</h4>;

  const didSubmitModalContent = (
    <>
      <h4>Order data was successfully Submitted</h4>
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onClose}>
          Close
        </button>
      </div>
    </>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitted && !didSubmit && cartModalContent}
      {isSubmitted && isSubmittingModalContent}
      {!isSubmitted && didSubmit && didSubmitModalContent}
    </Modal>
  );
};

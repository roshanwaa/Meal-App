import React from 'react';
import classes from './Header.module.css';
// import mealsImg from '../../Assets/meals.jpg';
import { HeaderCartButton } from './HeaderCartButton';

export const Header = (props) => {
  return (
    <>
      <header className={classes.header}>
        <h1>Food App</h1>
        <HeaderCartButton onClick={props.onShowCart} />
      </header>
      <div className={classes['main-image']}>
        <img
          src="https://images.unsplash.com/photo-1507980062492-714282f31ee0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1738&q=80"
          alt="chai"
        />
      </div>
    </>
  );
};

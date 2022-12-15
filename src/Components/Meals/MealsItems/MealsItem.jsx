import React, { useContext } from 'react';
import classes from './MealItem.module.css';
import { MealsItemForm } from './MealsItemForm';
import { CartContext } from '../../../Store/Cart-Context';

export const MealsItem = (props) => {
  const cartCTX = useContext(CartContext);

  // const mealPrice = props.price;
  // const result = Number(mealPrice).toFixed(2);
  // console.log(mealPrice, result, props.price.toFixed(2));

  const price = `₹ ${props.price.toFixed(2)}`;

  const addToChartHandler = (amount) => {
    cartCTX.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    });
  };

  return (
    <li className={classes.meal}>
      <div>
        <h2>{props.name}</h2>
        <div className={classes.description}>
          <h4>{props.description}</h4>
        </div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealsItemForm id={props.id} onAddToChart={addToChartHandler} />
      </div>
    </li>
  );
};

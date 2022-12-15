import React from 'react';
import classes from './MealsSummary.module.css';

export const MealsSummary = () => {
  return (
    <section className={classes.summary}>
      <h2>Delicious Chai, Delivered Here to you</h2>
      <p>
        Choose your favorite chai from our broad selection of available chai and
        enjoy a delicious lunch or dinner at home.
      </p>
      <p>
        All our Chai are cooked with high-quality ingredients, just-in-time!
      </p>
    </section>
  );
};

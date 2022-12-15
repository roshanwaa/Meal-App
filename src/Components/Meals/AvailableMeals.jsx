import React, { useEffect, useState } from 'react';
import classes from './AvailableMeals.module.css';
import { Card } from '../UI/Card';
import { MealsItem } from './MealsItems/MealsItem';

import { Spinner } from 'react-bootstrap';


const url =
  'https://food-order-app-9b789-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json';

export const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Something is wrong!');
      }

      const responseData = await response.json();

      // console.log(responseData);

      const loadedMealsData = [];

      for (const key in responseData) {
        loadedMealsData.push({
          id: key,
          description: responseData[key].description,
          name: responseData[key].name,
          price: responseData[key].price,
        });
      }
      setMeals(loadedMealsData);
      setIsLoading(false);
    };

    fetchMeals().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section className={classes.mealsLoading}>
        <Spinner animation="grow" variant="light" />
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={classes.mealsError}>
        <h3>{httpError}</h3>
      </section>
    );
  }

  const mealsList = meals.map((meal) => {
    return (
      <MealsItem
        id={meal.id} // this is new!
        key={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
      />
    );
  });

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

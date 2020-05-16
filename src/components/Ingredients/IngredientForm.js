import React, { useState } from 'react';
import LoadingIndicator from '../UI/LoadingIndicator'
import Card from '../UI/Card';
import './IngredientForm.css';

const IngredientForm = React.memo(props => {
  const [enteredTitle, setInputTitle] = useState('')
  const [enteredAmount, setInputAmount] = useState('')
  const submitHandler = event => {
    event.preventDefault();
    props.addIngredient({
      title: enteredTitle,
      amount: enteredAmount
    })
  };
  return (

    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">Name</label>
            <input type="text" id="title" value={enteredTitle}
              onChange={(e) => {
                setInputTitle(e.target.value)
              }} />
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input type="text" id="amount" value={enteredAmount}
              onChange={(e) => {
                setInputAmount(e.target.value)
              }} />
          </div>
          <div className="ingredient-form__actions">
            <button type="submit">Add Ingredient</button>
            {props.loading && <LoadingIndicator />}
          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;

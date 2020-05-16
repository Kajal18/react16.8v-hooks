import React, { useState, useEffect, useCallback, useReducer } from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList'
import ErrorModal from '../UI/ErrorModal'

const ingredientReducer = (currentIng, action) => {
  switch (action.type) {
    case 'SET':
      return action.ingredients
    case 'ADD':
      return [...currentIng, action.ingredient]
    case 'REMOVE':
      return currentIng.filter((obj) => obj.id !== action.id)
    default:
      throw new Error('this will not be the case!')
  }
}

function Ingredients() {
  const [ingredients, dispatch] = useReducer(ingredientReducer, [])
  // const [ingredients, setIngredients] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()

  const addIngHandler = (ing) => {
    setIsLoading(true)
    fetch('https://ingredient-system.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ing),
      headers: { 'Content-Type': 'application/json' }
    }).then(resp => {
      setIsLoading(false)
      return resp.json()
    }).then(data => {
      dispatch({
        type: 'ADD', ingredient: {
          id: data.name,
          ...ing
        }
      })
    }).catch(err => console.error(err))

  }

  const removeIngHandler = (id) => {
    setIsLoading(true)
    fetch(`https://ingredient-system.firebaseio.com/ingredients/${id}.json`, {
      method: 'DELETE',
    }).then(resp => {
      setIsLoading(true)
      dispatch({ type: 'REMOVE', id: id })
    }).catch(err => {
      setError('Something went wrong!')
      setIsLoading(false)
    })
  }

  const clearError = () => {
    setError(null)
  }
  const filterdIngHandler = useCallback((filteredIng) => {
    dispatch({ type: 'SET', ingredients: filteredIng })
  }, [])

  return (
    <div className="App">
      {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}
      <IngredientForm addIngredient={addIngHandler} loading={isLoading} />
      <section>
        <Search onLoadIngredients={filterdIngHandler} />
        <IngredientList ingredients={ingredients} onRemoveItem={removeIngHandler}></IngredientList>
      </section>
    </div>
  );
}

export default Ingredients;

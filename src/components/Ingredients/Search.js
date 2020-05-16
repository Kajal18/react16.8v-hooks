import React, { useState, useEffect, useRef } from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {
  const { onLoadIngredients } = props
  const [enteredFilter, setInputFilter] = useState('')
  const inputRef = useRef()
  useEffect(() => {
    const timer = setTimeout(() => {
      if (enteredFilter === inputRef.current.value) {
        const query = enteredFilter.length === 0 ? '' : `?orderBy="title"&equalTo="${enteredFilter}"`
        fetch('https://ingredient-system.firebaseio.com/ingredients.json' + query)
          .then(resp => resp.json())
          .then(data => {
            const loadedIngredient = []
            for (let key in data) {
              loadedIngredient.push({
                id: key,
                title: data[key].title,
                amount: data[key].amount
              })
            }
            onLoadIngredients(loadedIngredient)
          })
      }
    }, 500)
    return () =>{
      clearTimeout(timer)
    }
  }, [enteredFilter, onLoadIngredients, inputRef])

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input type="text"
            ref={inputRef}
            value={enteredFilter}
            onChange={(e) => setInputFilter(e.target.value)} />
        </div>
      </Card>
    </section>
  );
});

export default Search;

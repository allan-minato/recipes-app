import React from 'react';
import Buttons from './Buttons';
import Inputs from './Inputs';

function SearchBar() {
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('oi');
  };

  return (
    <div>
      <form onSubmit={ handleSubmit }>
        <Inputs
          type="text"
          dataTestid="search-input"
        />
        <Inputs
          type="radio"
          dataTestid="ingredient-search-radio"
          name="search-radio"
          value="ingrediente"
          labelText="Ingrediente"
        />
        <Inputs
          type="radio"
          dataTestid="name-search-radio"
          name="search-radio"
          value="name"
          labelText="Nome"
        />
        <Inputs
          type="radio"
          dataTestid="first-letter-search-radio"
          name="search-radio"
          value="first-letter"
          labelText="Primeira letra"
        />

        <Buttons
          type="submit"
          dataTestid="exec-search-btn"
        />
      </form>
    </div>
  );
}

export default SearchBar;

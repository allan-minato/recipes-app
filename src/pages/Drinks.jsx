import React from 'react';
import Header from '../components/Header';
import Recipes from './Recipes';

function Drink() {
  return (
    <div>
      <Header title="Drinks" />
      <Recipes />
    </div>
  );
}

export default Drink;

import React from 'react';
import Header from '../components/Header';
import Recipes from './Recipes';

function Meals() {
  return (
    <div>
      <Header title="Meals" />
      <Recipes />
    </div>
  );
}

export default Meals;

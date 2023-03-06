import React from 'react';
import Header from '../components/Header';
import RenderRecipes from '../components/RenderRecipes';

function Meals() {
  return (
    <div>
      <Header title="Meals" />
      <RenderRecipes />
    </div>
  );
}

export default Meals;

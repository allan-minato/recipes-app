import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function DoneRecipes() {
  return (
    <div>
      <Header title="Done Recipes" withSearchBar={ false } />
      <Footer />
    </div>
  );
}

export default DoneRecipes;

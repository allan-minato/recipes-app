import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Recipes from './Recipes';


function Drink() {
  return (
    <div>
      <Header title="Drinks" />
      <Recipes />
      <Footer />
    </div>
  );
}

export default Drink;

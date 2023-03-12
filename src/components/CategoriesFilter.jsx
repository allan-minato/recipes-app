import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import RecipesContext from '../context/recipesContext';
import apiFetch from '../helpers/apiFetch';
import Buttons from './Buttons';
import beefIcon from '../assets/svg/beef.svg';
import goatIcon from '../assets/svg/goat.svg';
import chickenIcon from '../assets/svg/chicken.svg';
import breakfastIcon from '../assets/svg/breakfast.svg';
import dessertIcon from '../assets/svg/dessert.svg';
import allIcon from '../assets/svg/allIcon.svg';
import '../styles/components/CategoriesFilter.sass';

const icons = {
  Beef: beefIcon,
  Goat: goatIcon,
  Chicken: chickenIcon,
  Breakfast: breakfastIcon,
  Dessert: dessertIcon,
  All: allIcon,
};

function CategoriesFilter({ apiType, pageName }) {
  const [categoryList, setCategoryList] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('');
  const { apiResponse, setFilteredRecipes } = useContext(RecipesContext);

  const amountOfCategories = 5;

  const apiCall = async (endpoint) => {
    const response = await apiFetch(apiType, endpoint);
    return response;
  };

  const getCategoriesByName = async (amount) => {
    const endpoint = 'list.php?c=list';
    const response = await apiCall(endpoint);

    const categoriesReduce = response[pageName].reduce((acc, { strCategory }, index) => {
      if (index < amount) {
        acc.push(strCategory);
      }
      return acc;
    }, []);
    setCategoryList(categoriesReduce);
  };

  const getRecipesByCategory = async (category) => {
    const endpoint = `filter.php?c=${category}`;
    const response = await apiCall(endpoint);
    const api = {
      ...apiResponse,
      [pageName]: response[pageName],
    };
    setFilteredRecipes(api);
  };

  const handleClick = (category) => {
    if (category === 'All' || category === categoryFilter) {
      setCategoryFilter('');
      setFilteredRecipes(apiResponse);
      return;
    }

    setCategoryFilter(category);
  };

  useEffect(() => {
    getCategoriesByName(amountOfCategories);
  }, []);

  useEffect(() => {
    if (categoryFilter === '') return;

    getRecipesByCategory(categoryFilter);
  }, [categoryFilter]);

  return (
    <div className="categoriesContainer">
      <Buttons
        category="All"
        labelText="All"
        dataTestid="All-category-filter"
        onClick={ () => handleClick('All') }
        icon={ icons.All }
        btnClass={ `categoryBtn ${categoryFilter === '' ? 'Selected' : ''}` }
      />

      {categoryList.map((category) => (
        <Buttons
          key={ category }
          category={ category }
          labelText={ category }
          dataTestid={ `${category}-category-filter` }
          onClick={ () => handleClick(category) }
          icon={ icons[category] }
          btnClass={ `categoryBtn ${categoryFilter === category ? 'Selected' : ''}` }
        />
      ))}

    </div>
  );
}

CategoriesFilter.propTypes = {
  apiType: PropTypes.string,
}.isRequired;

export default CategoriesFilter;

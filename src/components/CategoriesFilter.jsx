import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import RecipesContext from '../context/recipesContext';
import apiFetch from '../helpers/apiFetch';
import Buttons from './Buttons';

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
    <div>
      {categoryList.map((category) => (
        <Buttons
          key={ category }
          category={ category }
          labelText={ category }
          dataTestid={ `${category}-category-filter` }
          onClick={ () => handleClick(category) }
        />
      ))}
      <Buttons
        category="All"
        labelText="All"
        dataTestid="All-category-filter"
        onClick={ () => handleClick('All') }
      />
    </div>
  );
}

CategoriesFilter.propTypes = {
  apiType: PropTypes.string,
}.isRequired;

export default CategoriesFilter;

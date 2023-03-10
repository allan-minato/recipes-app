import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from './pages/Login';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import RecipeDetails from './pages/RecipeDetails';
import RecipeInProgress from './pages/RecipeInProgress';

import './App.css';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route
          exact
          path="/meals"
          component={ Meals }
        />
        <Route
          exact
          path="/drinks"
          component={ Drinks }
        />
        <Route
          exact
          path="/profile"
          component={ Profile }
        />
        <Route
          exact
          path="/done-recipes"
          component={ DoneRecipes }
        />
        <Route
          exact
          path="/favorite-recipes"
          component={ FavoriteRecipes }
        />
        <Route
          exact
          path="/meals/:id"
          component={ RecipeDetails }
        />
        <Route
          exact
          path="/drinks/:id"
          component={ RecipeDetails }
        />
        <Route
          exact
          path="/meals/:id/in-progress"
          component={ RecipeInProgress }
        />
        <Route
          exact
          path="/drinks/:id/in-progress"
          component={ RecipeInProgress }
        />

      </Switch>
    </div>
  );
}

export default App;

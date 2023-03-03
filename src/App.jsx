import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';

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
          component={ Meals }
        />
        <Route
          exact
          path="/drinks/:id"
          component={ Drinks }
        />
        <Route
          exact
          path="/meals/:id/in-progress"
          component={ Meals }
        />
        <Route
          exact
          path="/drinks/:id/in-progress"
          component={ Meals }
        />

      </Switch>
    </div>
  );
}

export default App;

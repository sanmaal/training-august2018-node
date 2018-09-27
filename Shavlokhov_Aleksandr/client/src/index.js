import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Switch, Route} from "react-router-dom";

import PokemonList from "./containers/PokemonList.jsx";
import PokemonDetails from "./containers/PokemonDetails.jsx";
import CaughtPokemons from './components/CaughtPokemons/CaughtPokemons.jsx';
import Register from './containers/Register.jsx';
import Login from './containers/Login.jsx';
import Navigation from './containers/Navigation.jsx';

class PokeApp extends Component {
  render(){
    return (
      <div className="wrapper">
        <div className="nav-menu">
          <Navigation />
        </div>
        <div className="pokeapp">
          <Fragment>
            <Switch>
              <Route exact path='/' component={PokemonList} />
              <Route exact path='/pokemon/:id' component={PokemonDetails} />
              <Route exact path='/captured-pokemons' component={CaughtPokemons}/>
              <Route path='/login' component={Login} />
              <Route path='/register' component={Register} />
      			</Switch>
      		</Fragment>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<BrowserRouter><PokeApp /></BrowserRouter>, document.getElementById('root'));

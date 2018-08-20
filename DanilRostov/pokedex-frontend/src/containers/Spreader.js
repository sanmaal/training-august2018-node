import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import PokemonsList from '../components/PokemonsList';
import PokemonsCatched from '../components/PokemonsCatched';
import PokemonPage from '../components/PokemonPage';

import constants from '../constants';

export default class Spreader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      catchedPokemons: [],
      catchedIds: [],
      loadedPokemons: [],
      isAuth: false
    }
  }

  // isAuthenticated = () => {
  //   localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViNzliZmNlMzY1MTU3MjBjNTNkNzMwMyIsImlhdCI6MTUzNDcwNTYxNCwiZXhwIjoxNTM0NzA5MjE0fQ.4PJoPhj5CcYOatPEAKE-DerF1J_JdCjZb1QM-1HpPXo');
  //   const token = localStorage.getItem('token');
  //   console.log(token);
  //   if(token) {
  //     fetch(`${constants.host}/authorize`, {
  //       headers: {
  //         "Content-Type": "application/json; charset=utf-8",
  //         "x-token": token
  //       },
  //     })
  //     .then(res => res.json())
  //     .then(data => {
  //       if(data.isAuth) {
  //         this.setState({
  //           isAuth: true
  //         });
  //       }
  //     });
  //   }
  // }

  // componentDidMount = () => {
  //   console.log(this.isAuthenticated());
  // }

  handleCatched = (pokemons, pokemon, date) => {
    const { catchedPokemons, catchedIds } = this.state;
    pokemon.dateOfCatching = date;
    this.setState({
      catchedPokemons: catchedPokemons.concat(pokemon),
      catchedIds: catchedIds.concat(pokemon.id),
    });
  }

  handleLoadPokemons = (pokemons) => {
    this.setState({
      loadedPokemons: pokemons,
    });
  }

  render() {
    const { catchedPokemons, catchedIds } = this.state;
    return (
      <Switch>
        <Route
          exact path="/"
          render={(props) => <PokemonsList
                                {...props}
                                catchedIds={catchedIds}
                                catchedPokemons={catchedPokemons}
                                onCatched={this.handleCatched}
                                onLoadPokemons={this.handleLoadPokemons}
                                host={constants.host}
                                imgSrc={constants.imgSrc}
                             />}
        />
        <Route
           exact path="/catched"
           render={(props) => <PokemonsCatched
                                {...props}
                                catchedPokemons={this.state.catchedPokemons}
                                imgSrc={constants.imgSrc}
                              />}
         />
        <Route
          exact path="/pokemon/:id"
          render={(props) => <PokemonPage
                                {...props}
                                catchedIds={catchedIds}
                                catchedPokemons={catchedPokemons}
                                loadedPokemons={this.state.loadedPokemons}
                                host={constants.host}
                                imgSrc={constants.imgSrc}
                             />}
        />
      </Switch>
    );
  }
}

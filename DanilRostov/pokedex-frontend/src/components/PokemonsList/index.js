import React, { Component } from 'react';

import './style.css';
import Pokemon from '../Pokemon';

export default class PokemonsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemons: [],
    };
  }

  loadPosts = () => {
    const { pokemons } = this.state;
    const { host } = this.props;
    const limit = 10;
    fetch(`${host}/pokemons?_start=${pokemons.length}&_limit=${limit}`)
      .then((res) => res.json())
      .then((newPokemons) => {
        this.setState({
          pokemons: pokemons.concat(newPokemons),
          catchedIds: [],
        });
        this.props.onLoadPokemons(this.state.pokemons);
      });
  }

  componentDidMount() {
    this.loadPosts();
  }

  onCatched = (pokemon, date) => {
    const { catchedIds, pokemons } = this.state;
    this.props.onCatched(pokemons, pokemon, date);
    this.setState({
      catchedIds: catchedIds.concat(pokemon.id),
    })
  }

  render() {
    const { pokemons } = this.state;

    return (
      <div className="list">
        {pokemons.map((pokemon) => <Pokemon
          key={pokemon.id}
          id={pokemon.id}
          name={pokemon.name}
          catched={this.props.catchedIds.indexOf(pokemon.id) !== -1}
          catchedIds={this.state.catchedIds}
          pokemon={pokemon}
          onCatched={this.onCatched}
          imgSrc={this.props.imgSrc}
          host={this.props.host}
          catchPossible
        />
        )}
        <div className="btn-box">
          <button className="btn btn-primary" onClick={this.loadPosts}>Load more pokemons</button>
        </div>
      </div>
    );
  }
}

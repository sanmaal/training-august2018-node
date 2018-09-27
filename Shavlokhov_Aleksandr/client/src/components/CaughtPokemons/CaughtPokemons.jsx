import React, { Component } from 'react';
import PokemonList from '../../containers/PokemonList.jsx';

export default class CaughtPokemons extends Component {
    render() {
        return (
			<PokemonList source="/api/caught_pokemons" />
        );
    }
}

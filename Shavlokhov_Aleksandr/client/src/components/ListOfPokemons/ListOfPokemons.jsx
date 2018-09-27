import React, {Component} from 'react';
import PokemonItem from '../../containers/PokemonItem.jsx'

export default class ListOfPokemons extends Component {
  render() {
    const {species, loader} = this.props;
    let content = species.map((pokemon) =>
    <PokemonItem key={pokemon.name} name={pokemon.name} id={pokemon.id} captured={pokemon.captured}/>)
      return  (
        <div className="wrapper">
          <div className="pokemon-list">
            {content}
          </div>
          <button className="loadmore-btn" onClick={loader}>Load more</button>
        </div>
      )
  }
}

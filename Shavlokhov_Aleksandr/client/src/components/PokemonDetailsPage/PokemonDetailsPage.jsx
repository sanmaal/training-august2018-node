import React, { Component } from "react";

export default class PokemonDetailsPage extends Component {
  render() {
    const date = this.props.date;
    const id = this.props.id;
    const captured = this.props.captured;
    const name = this.props.name;
    const imgSource = 'https://raw.githubusercontent.com/epam-js-may-2018/homework-7-js/master/pokemons/';

    return (
      <div className="pokemon-page">
        <div className="pokemon-img">
          <img src={`${imgSource}${id}.png`} alt={`${name}`} />
        </div>
        <div className="pokemon-info">
          ID: {id}
        </div>
        <div className="pokemon-info">
          {date}
        </div>
        <div className="pokemon-info">
          Name: {name}
        </div>
        <div className="pokemon-info" captured={captured}>
          Pokemon {captured ? 'caught' : 'not caught yet'}
        </div>
      </div>
    )
  }
}

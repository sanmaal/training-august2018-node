import React, { Component } from "react";
import PokemonDeatilsPage from "../components/PokemonDetailsPage/PokemonDetailsPage.jsx";

export default class PokemonDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.id,
    }
  }

  loadPokemon() {
    let {id} = this.state;
    fetch(`/api/pokemons/${id}`)
      .then((response) => response.json())
      .then(pokemon => {
          this.setState({
            name: pokemon.name,
            captured: pokemon.captured,
            date: pokemon.date,
          });
      });
  }

  componentDidMount() {
    this.loadPokemon();
  }

  render() {
    let {id, name, captured, date} = this.state;
    return (
      <PokemonDeatilsPage id={id} name={name} captured={captured} date={date}/>
    )
  }
}

import React, { Component } from "react";
import ListItem from "../ListItem";
import PokemonDetails from "../PokemonDetails";
import "./PokemonList.css";
export default class PokemonList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemons: [],
      curPage: this.props.match.url,
      curPokemonListPage: 0,
      requestUrlPart: "",
      probablyLastPage: false,
	  pokemonNames: [],
	  dataStatus: null
    };
    this.loadPokemons = this.loadPokemons.bind(this);
  }
  loadPokemons() {
    this.state.curPokemonListPage++;
    console.log(
      `${this.props.dbLink}/api${this.state.curPage}?page=${
        this.state.curPokemonListPage
      }&limit=${this.props.pageLimit}`
    );
    fetch(
      `${this.props.dbLink}/api${this.state.curPage}?page=${
        this.state.curPokemonListPage
      }&limit=${this.props.pageLimit}`
    )
      .then(data => {
        this.setState({dataStatus: data.status});
        return data.json();
      })
      .then(pokemonsList => {
        this.setState({
          pokemons: this.state.pokemons.concat(pokemonsList)
        });
        pokemonsList.length < this.props.pageLimit
          ? this.setState({probablyLastPage: true})
          : "";
      })
      .catch(function(err) {
        console.log(err);
      });
  }
  componentDidMount() {
    this.loadPokemons();
  }
  render() {
    const pokemons = this.state.pokemons;
    const imageUrl = this.props.imageDirectory;
    return (
      <React.Fragment>
		  <h3 hidden={!this.state.dataStatus==403}>This section is only for logged in users.</h3>
        <ul className="pokemons-list">
          {" "}
          {this.state.pokemons.map(pokemon =>
            React.createElement(ListItem, {
              key: pokemon.id,
              id: pokemon.id,
              name:
                pokemon.name ||
                this.state.pokemonNames[pokemons.indexOf(pokemon)],
              image:
                "https://raw.githubusercontent.com/epam-js-may-2018/homework-7-js/master/pokemons/" +
                pokemon.id +
                ".png",
              url: this.props.defaultLink + pokemon.id,
              hasBeenCaught: pokemon.hasBeenCaught
            })
          )}{" "}
        </ul>
        <button
          hidden={this.state.probablyLastPage || this.state.dataStatus==403}
          id="load-more-btn"
          onClick={this.loadPokemons}
        >
          {" "}
          Load more{" "}
        </button>
      </React.Fragment>
    );
  }
}
PokemonList.defaultProps = {
  pageLimit: 16,
  dbLink: "http://localhost:3000",
  imagePath: "/pokemons/",
  imageType: ".png",
  defaultLink: "/pokemons/",
  caughtOnes: "/caughtPokemons",
  imageDirectory: "/pokemons/"
};

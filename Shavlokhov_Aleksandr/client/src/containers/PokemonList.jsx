import React, {Component} from 'react';
import 'whatwg-fetch';
import axios from 'axios';

import ListOfPokemons from '../components/ListOfPokemons/ListOfPokemons.jsx'

export default class PokemonList extends Component {
  constructor(props){
    super(props);
    this.state = {
      pokemons : [],
      skip: 0,
    };
  }
  
  loadPokemons = () => {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
		const { pokemons, skip } = this.state;
		const limit = 9;
    let {source} = this.props;
    if (!source) {
      source = '/api/pokemons'
    }
    axios.get(`${source}?limit=${limit}&skip=${skip}`)
		.then((newPokemons) => {
			this.setState({
				pokemons: pokemons.concat(newPokemons.data),
				skip: skip+9,
			});
    });
	}

  componentDidMount() {
    this.loadPokemons();
  }

  render() {
    const {pokemons} = this.state;
    return (
      <div>
        <ListOfPokemons
          species={pokemons}
          loader={this.loadPokemons}
        />
      </div>
    )
  }
}

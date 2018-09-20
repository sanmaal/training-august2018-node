import React, {Component} from 'react';
import Pokemon from '../components/Pokemon/Pokemon.jsx'

export default class PokemonItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hideBtn: false,
    }
  }
  
  handleCatch = () => {
    const { name, id } = this.props;
    const date = new Date().toString();
    fetch(`/api/pokemons/${id}`, {
			method: 'PUT',
			body: JSON.stringify({name, id, date, captured: true}),
			headers: {
				'Content-Type': 'application/json'
		  }
    });
    this.setState({
      hideBtn: true,
    })
  }

  render() {
    const { name, id, captured } = this.props;
    return (
      <Pokemon
        id={id}
        name={name}
        captured={captured}
        handleCatch={this.handleCatch}
        hideBtn={this.state.hideBtn}
      />
    )
  }
}

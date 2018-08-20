import React, {Component} from 'react';
import PokemonDetails from '../PokemonDetails'
import './ListItem.css';


export default class ListItem extends Component{

  constructor(props){
    super(props);

    this.state = {
      hasBeenCaught: this.props.hasBeenCaught || false
    }

    this.catchPokemon = this.catchPokemon.bind(this);
  }

  catchPokemon(e){
    e.stopPropagation();
    let captureTime = new Date;
    captureTime = captureTime.toLocaleString("ru");
    this.state.hasBeenCaught= true;
    let lastProps = {
      id: this.props.id,
      time: captureTime
    };
    fetch(`${this.props.dbLink}${this.props.caughtOnes}`,{
      method:'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(lastProps)
    })

    e.target.setAttribute('disabled', true);
  }

  render(){
    return(
      <li className="pokemon-list__item" key={this.props.id}>
        <a href={this.props.url}>
          <img src={this.props.image} alt={this.props.name}/>
          <span>{this.props.name}</span>
        </a>
        <button disabled={this.props.hasBeenCaught} onClick={this.catchPokemon} className="catch-pokemon">Catch</button>
      </li>
    )
  }
}

ListItem.defaultProps={
  defaultLink: '/pokemons',
  caughtOnes: '/caughtPokemons',
  dbLink: 'http://localhost:3000'
}

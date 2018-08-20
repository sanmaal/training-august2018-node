import React, {Component} from 'react';
import './PokemonDetails.css'

export default class PokemonDetails extends Component{

  constructor(props){
    super(props);

    this.state = {
      thisPokemon: {},
      caughtTime: ''
    }

    this.hasBeenCaught = this.hasBeenCaught.bind(this);
  }

  hasBeenCaught(item){
    if(item.id){
      fetch(`${this.props.dbLink}${this.props.caughtOnes}${item.id}`)
      .then(data=>data.json())
      .then(caughtInfo=>{
        if(caughtInfo.time){
          this.setState({caughtTime: 'Pokemon has been caught at '+caughtInfo.time })
        } else{
            this.setState({caughtTime: 'Pokemon has not been caught yet' })
        }
      });
    }
  }

  componentDidMount(){
    fetch(`${this.props.dbLink}${this.props.defaultLink}${this.props.match.params.pokemonId}`)
    .then(data=>data.json())
    .then(receivedPokemon=>{
      this.setState({thisPokemon:receivedPokemon});
      this.hasBeenCaught(receivedPokemon);
    })
  }

  render(){
    return (
      <div className="pokemon-info">
        <span className="pokemon-info__id">{this.state.thisPokemon.id}</span>
        <span className="pokemon-info__name">{this.state.thisPokemon.name}</span>
        <span className="pokemon-info__caught">{this.state.caughtTime}</span>
        <img src={`https://raw.githubusercontent.com/epam-js-may-2018/homework-7-js/master/pokemons/${this.state.thisPokemon.id}.png`}/>
      </div>
    )
  }
}

PokemonDetails.defaultProps={
  dbLink: 'http://localhost:3000',
  imagePath: '/pokemons/',
  imageType: '.png',
  defaultLink: '/pokemons/',
  caughtOnes: '/caughtPokemons/',
}

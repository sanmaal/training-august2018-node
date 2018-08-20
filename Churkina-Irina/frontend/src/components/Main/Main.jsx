import React, {Component} from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PokemonList from '../PokemonList';
import PokemonDetails from '../PokemonDetails';
import WelcomePage from '../WelcomePage';
import LoginPage from '../LoginPage';
import './Main.css';

export default class Main extends Component{

  constructor(props){
	super(props);
	
	this.state = {
		loggedIn: ''
	}
  }

  componentDidMount(){
	 setTimeout(() => {
		fetch(`http://localhost:3000/getUser`)
		.then(data=>{
		   console.log(data);
		   return data.json()
	   })
		.then(res=>{
			console.log(res)
			this.setState({loggedIn: res.username})
		}).catch((err)=>console.error(err))
	 }, 1000);
  }

  render(){
    return(
      <main role="main">
	  <span>{this.state.loggedIn}</span>
        <div className="container">
          <BrowserRouter>
            <Switch>
            <Route path={this.props.pokemonsLink} exact component={PokemonList}/>
            <Route path={this.props.caugthPokemonsLink} exact component={PokemonList}/>
            <Route path={this.props.specificPokemon} component={PokemonDetails} />
            <Route path={this.props.loginLink} component={LoginPage} />
			<Route path='/' component={WelcomePage} />
            </Switch>
          </BrowserRouter>
        </div>
      </main>
    )
  }
}

Main.defaultProps = {
  dbLink: 'http://localhost:3000',
  pokemonsLink: '/pokemons',
  loginLink: '/login',
  getUserDataLink: '/currentUserData',
  caugthPokemonsLink: '/caughtPokemons',
  specificPokemon: '/pokemons/:pokemonId'
}
import React, {Component} from 'react';
import './Header.css'

export default class Header extends Component{

  constructor(props){
    super(props);

    this.state = {
      defaultLink: '/pokemons',
	  caughtPokemonsLink: '/caughtPokemons',
	  loginLink: '/login'
    }
  }

  render(){
    return(
      <header>
        <nav className="navbar navbar-expand-lg navbar-dark" role="navigation">
          <div className="container">
			<a className="navbar-brand" href="/">Pokedex</a>
			<ul className="navbar-nav mr-auto">
				<li className={window.location.href.indexOf(this.state.defaultLink)> 0 ? 'nav-item active' : 'nav-item'}>
				<a href={this.state.defaultLink} className="nav-link">Pockemons list</a>
				</li>
				<li className={window.location.href.indexOf(this.state.caughtPokemonsLink) > 0 ? 'nav-item active' :    'nav-item'}>
				<a href={this.state.caughtPokemonsLink} className="nav-link">Caught pockemons</a>
				</li>
			</ul>
			<ul className="navbar-nav navbar-right">
				<li className={window.location.href.indexOf(this.state.loginLink)> 0 ? 'nav-item active' : 'nav-item'}>
					<a href="/login" className="nav navbar-nav nav-link">Log In</a>
				</li>
			</ul>
          </div>
        </nav>
      </header>
    )
  }
}

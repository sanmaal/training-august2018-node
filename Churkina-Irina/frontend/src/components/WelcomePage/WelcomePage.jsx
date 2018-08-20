import React, {Component} from 'react';
import './WelcomePage.css';

export default class extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div className="welcome-page-block">
          <h1>Hi there :) Welcome to <span>Pokédex</span> app!</h1>
          <span>Select the list of pokémon you would like to view in the top navigation</span>
      </div>
    )
  }
}

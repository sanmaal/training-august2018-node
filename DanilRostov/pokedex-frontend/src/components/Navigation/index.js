import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import './style.css';

export default class Navigation extends Component {
  state = {
    dropdownOpen: false
  }

  toggle = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  render() {  
    return (
      <ul className="nav justify-content-center">
        <li className="nav-item">
          <Link className="nav-link active" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/catched">Catched pokemons</Link>
        </li>
        <Dropdown className="sign-in" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
          <DropdownToggle caret>Sign in</DropdownToggle>
          <DropdownMenu>
            <DropdownItem header>Danil Rostov</DropdownItem>
            <DropdownItem divider />
            <DropdownItem className="sign-in__item">Log out</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </ul>
    );
  }
}
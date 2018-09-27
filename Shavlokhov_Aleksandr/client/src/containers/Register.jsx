import React, { Component } from 'react';
import axios from 'axios';

class Create extends Component {

  constructor() {
    super();
    this.state = {
      username: '',
      password: ''
    };
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { username, password } = this.state;

    axios.post('/api/register', { username, password })
      .then((result) => {
        this.props.history.push("/login")
      });
  }

  render() {
    const { username, password } = this.state;
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <h2>Register</h2>
          <label for="inputEmail">Email address</label>
          <input type="email" placeholder="Email address" name="username" value={username} onChange={this.onChange} required/>
          <label for="inputPassword">Password</label>
          <input type="password" placeholder="Password" name="password" value={password} onChange={this.onChange} required/>
          <button type="submit">Register</button>
        </form>
      </div>
    );
  }
}

export default Create;
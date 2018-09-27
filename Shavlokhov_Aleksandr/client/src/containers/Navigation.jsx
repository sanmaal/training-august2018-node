import React, {Component} from 'react';
import { Link } from 'react-router-dom';

export default class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authorized: false,
        }
    }

    handleLogout = () => {
        localStorage.removeItem('jwtToken');
        window.location.reload();
    }

    render() {

        return (
            <div>
                <button className="nav-btn">
                    <Link to="/register">Register</Link>
                </button>
                <button className="nav-btn">
                    <Link to="/login">Login</Link>
                </button>
                { localStorage.getItem('jwtToken') &&
                    <button className="nav-btn" onClick={this.handleLogout}>Logout</button>
                } 
                <button className="nav-btn">
                    <Link to="/">Home</Link>
                </button>
                    <button className="nav-btn">
                    <Link to="/captured-pokemons">Caught Pokemons</Link>
                </button>
            </div>
        )
    }
}
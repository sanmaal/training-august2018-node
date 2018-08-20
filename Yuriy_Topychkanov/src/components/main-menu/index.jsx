import React from 'react';
import {Link} from 'react-router-dom';
import './style.css';

export default function MainMenu() {
    return (
        <ul className='main-menu'>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/captured-pokemons'>Captured pokemons</Link></li>
        </ul>)

}
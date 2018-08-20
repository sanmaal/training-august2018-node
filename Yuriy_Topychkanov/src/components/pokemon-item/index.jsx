import React from 'react';
import './style.css';
import CatchButton from '../catch-button/index.jsx';
import {Link} from 'react-router-dom';

export default function PokemonItem(props) {
    const { name, id } = props;
    return <li className='pokemon-item'>
        <span>{name.toUpperCase()}</span>
        <Link to={`./pokemon/${id}`}>
            <img src={`https://github.com/epam-js-may-2018/homework-7-js/raw/master/pokemons/${id}.png`}
                 alt={name}/>
        </Link>
        <CatchButton name={name} id={id}/>
    </li>;
}
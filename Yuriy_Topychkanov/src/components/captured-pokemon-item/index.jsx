import React from 'react';
import './style.css';
import ReleaseButton from "../release-button/index.jsx";
import {Link} from 'react-router-dom';

export default function CapturedPokemonItem(props) {
    const { name, id, date, releaseCallback } = props;
    const hidePokemonItem = () => {
        releaseCallback();
    };

    return <li className='pokemon-item ' key={id}>
        <span>{name.toUpperCase()}</span>
        <Link to={`./pokemon/${id}`}>
            <img src={`https://github.com/epam-js-may-2018/homework-7-js/raw/master/pokemons/${id}.png`}
                 alt={name}/>
        </Link>
        <div><span className='date-text'>DATE OF CAPTURE</span><br/><span className='date'>{date}</span></div>
        <ReleaseButton id={id} callback={hidePokemonItem}/>
    </li>;
}
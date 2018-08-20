import React from 'react';
import './style.css';
import CapturedPokemonItem from "../captured-pokemon-item/index.jsx";

export default function CapturedPokemonsList(props) {
    const { pokemonsList, fullList, releaseCallback } = props;
    const listClassName = fullList ? 'pokemons-list full-list' : 'pokemons-list';
    return pokemonsList.length !== 0
        ? <ul className={listClassName}>
            {
                pokemonsList.map((value, index) => {
                    return <CapturedPokemonItem releaseCallback={releaseCallback} key={index} name={value.name}
                                                id={value.id}
                                                date={value.captureTime}/>
                })
            }
        </ul>
        :
        <div className='empty-list-text'>You didnt catch any pokemon yet</div>;
}
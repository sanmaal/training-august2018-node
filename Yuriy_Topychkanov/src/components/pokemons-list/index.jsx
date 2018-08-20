import React from 'react';
import PokemonItem from '../pokemon-item/index.jsx';
import './style.css';

export default function PokemonsList(props) {
    const { pokemonsList } = props;
    return <ul className='pokemons-list'>
        {
            pokemonsList.map((value, index) => {
                return <PokemonItem key={index} name={value.name} id={value.id}/>
            })
        }
    </ul>;
}
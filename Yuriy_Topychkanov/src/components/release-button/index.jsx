import React from 'react';
import './style.css';

export default function ReleaseButton(props) {

    const releasePokemon = () => {
        const { id, callback } = props;
        fetch(`http://localhost:3000/captured-pokemons/${id}`, { method: 'DELETE' }).then(() => callback());
    };
    return <button onClick={releasePokemon} className='release-btn'>Release</button>

}
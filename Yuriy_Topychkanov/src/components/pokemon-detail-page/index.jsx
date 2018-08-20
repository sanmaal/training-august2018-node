import React from 'react';
import ReleaseButton from "../release-button/index.jsx";
import CatchButton from "../catch-button/index.jsx";
import './style.css';


export default function PokemonDetailPage(props) {
    const { name, id, captured, date, callback } = props;
    return <div className='pokemon-detail'>
        <h2>{name.toUpperCase()}</h2>
        <figure>
            <img src={`https://github.com/epam-js-may-2018/homework-7-js/raw/master/pokemons/${id}.png`}
                 alt={name}/>
            <figcaption>
                    <span
                        className={captured ? 'catched-text' : 'hidden'}>DATE OF CAPTURE <br/> <span>{date}</span></span>
            </figcaption>
        </figure>
        {captured
            ? <ReleaseButton id={+id} callback={callback}/>
            : <CatchButton id={+id} callback={callback} name={name}/>
        }
    </div>;
}

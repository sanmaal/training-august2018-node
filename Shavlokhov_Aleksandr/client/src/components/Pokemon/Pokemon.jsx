import React, {Component} from 'react';
import { Link } from 'react-router-dom';

export default class Pokemon extends Component {
  render() {
    const imgSource = 'https://raw.githubusercontent.com/epam-js-may-2018/homework-7-js/master/pokemons/';
    let {name, id, captured, handleCatch, hideBtn} = this.props;
    return (
      <div className="pokemon-item">
        <div className="pokemon-img">
          <Link to={`/pokemon/${id}`}>
            <img src={`${imgSource}${id}.png`} alt={`${name}`}/>
          </Link>
        </div>
        <div className="pokemon-name">
          <Link to={`/pokemon/${id}`}>
            {name}
          </Link>
        </div>
        <button className="catchBtn"onClick={handleCatch} disabled={captured || hideBtn}>
          {captured || hideBtn ? 'Caught' : 'Catch'}
        </button>
      </div>
    )
  }
}

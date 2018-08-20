import React, {Component, Fragment} from 'react';
import PokemonsList from '../components/pokemons-list/index.jsx';

export default class PokeListController extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nextPage: 1,
            pokemonsList: [],
            fullList: false
        }
    }

    componentDidMount() {
        this.getPokemons();
    }

    getPokemons() {
        fetch(`http://127.0.0.1:3000/pokemons?_page=${this.state.nextPage}`).then((response) => response.json().then((pokemons) => {
            console.log('testing');
            let fullList = false;
            if (pokemons.length !== 10)
            {
                fullList = true;
            }
            this.setState({
                pokemonsList: this.state.pokemonsList.concat(pokemons),
                nextPage: ++this.state.nextPage,
                fullList: fullList
            })
        }));
    }

    getNextPage = () => {
        this.getPokemons();
    };

    render() {
        const { fullList, nextPage, pokemonsList } = this.state;
        const nameOfClass = fullList ? "more-button disabled" : "more-button";
        return (

            <Fragment>
                <PokemonsList page={nextPage} pokemonsList={pokemonsList}/>
                <button onClick={this.getNextPage} className={nameOfClass}>Load more</button>
            </Fragment>
        );
    }
}

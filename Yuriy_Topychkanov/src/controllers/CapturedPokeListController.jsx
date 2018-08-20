import React, {Component, Fragment} from 'react';
import CapturedPokemonsList from "../components/captured-pokemons-list/index.jsx";

export default class CapturedPokeListController extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nextPage: 1,
            pokemonsList: [],
            fullList: false
        }
    }

    componentDidMount() {
        this.getPokemonsFirstPage();
    }

    getPokemonsFirstPage = () => {
        let pokemonsList = CapturedPokeListController.getPokemonsTotalCount();
        let totalCount = 0;
        pokemonsList.then((pokemonsList) => {
            totalCount = pokemonsList.length;
            let pokemons = CapturedPokeListController.getPokemons(1);
            pokemons.then((pokemons) => {

                this.setState({
                    pokemonsList: pokemons,
                    nextPage: 2,
                    fullList: totalCount <= 10
                });
            });
        });
    };

    static getPokemons(page) {
        return fetch(`http://localhost:3000/captured-pokemons?_page=${page}`).then((response) => response.json());
    };

    static getPokemonsTotalCount() {
        return fetch('http://localhost:3000/captured-pokemons').then((response) => response.json());
    };

    getNextPage = () => {
        const pokemons = CapturedPokeListController.getPokemons(this.state.nextPage);
        pokemons.then((pokemons) => {
            let fullList = pokemons.length !== 10;
            this.setState({
                pokemonsList: this.state.pokemonsList.concat(pokemons),
                nextPage: ++this.state.nextPage,
                fullList: fullList
            })
        });

    };


    render() {
        const nameOfClass = this.state.fullList ? "more-button disabled" : "more-button";
        return (

            <Fragment>
                <CapturedPokemonsList releaseCallback={this.getPokemonsFirstPage} pokemonsList={this.state.pokemonsList}
                                      fullList={this.state.fullList}/>
                <button onClick={this.getNextPage} className={nameOfClass}>Load more</button>
            </Fragment>
        );
    }
}
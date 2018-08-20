import React, {Component} from 'react';
import PokemonDetailPage from "../components/pokemon-detail-page/index.jsx";

export default class PokeDetailController extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            name: '',
            captured: false,
            date: ''
        };
    };

    componentDidMount() {
        this.getPokeInfo();
    }

    getPokeInfo = () => {
        let promises = [];
        promises.push(fetch(`http://localhost:3000/pokemons/${this.state.id}`).then(response => response.json()));
        promises.push(fetch(`http://localhost:3000/captured-pokemons/${this.state.id}`).then(response => response.json()));
        Promise.all(promises).then(
            responses => {
                let pokeInfo = {};
                responses.map(
                    response => {
                        response.name !== undefined ? pokeInfo.name = response.name : false;
                        response.captureTime !== undefined ? pokeInfo.captureTime = response.captureTime : false;
                    });
                const { name, captureTime } = pokeInfo;
                this.setState(
                    {
                        name: name,
                        date: captureTime,
                        captured: captureTime !== undefined
                    });
            },
        );
    };

    render() {
        const { name, id, captured, date } = this.state;
        return <PokemonDetailPage name={name} id={id} captured={captured} date={date} callback={this.getPokeInfo}/>
    }
}
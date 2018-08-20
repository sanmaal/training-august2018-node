import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import PokeListController from "./PokeListController.jsx";
import CapturedPokeListController from "./CapturedPokeListController.jsx";
import PokeDetailController from "./PokeDetailController.jsx";

export default class BodyController extends Component {
    constructor(props) {
        super(props);
    }

    BodyRouter = () => (
        <div className='main-block'>
            <Switch>
                <Route exact path='/' component={PokeListController}/>
                <Route path='/captured-pokemons' component={CapturedPokeListController}/>
                <Route path='/pokemon/:id' component={PokeDetailController}/>
            </Switch>
        </div>
    );

    render() {
        return this.BodyRouter();
    }
}
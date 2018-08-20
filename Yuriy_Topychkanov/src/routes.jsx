import React, {Fragment} from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom'
import LeftPanel from "./components/left-panel/index.jsx";
import MainPanel from "./components/main-panel/index.jsx";


const MainPage = ({match}) => (
    <Fragment>
        <LeftPanel/>
        <MainPanel url={match.url} params={match.params}/>
    </Fragment>
);


const AppRouter = () => (
    <Router>
        <Switch>
            <Route exact path="/" component={MainPage}/>
            <Route exact path="/captured-pokemons" component={MainPage}/>
            <Route exact path="/pokemon/:pokemonId" component={MainPage}/>
        </Switch>
    </Router>
);
export default AppRouter
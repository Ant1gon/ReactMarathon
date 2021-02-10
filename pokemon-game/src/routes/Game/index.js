
import { useState, useEffect, useContext } from 'react';
import { Link, Switch, Route, useRouteMatch } from "react-router-dom";
import StartPage from './Start';
import BoardPage from './Board';
import FinishPage from './Finish';
import { PokemonContext } from '../../context/pokemonContext';


//import s from './style.module.css'

const GamePage = () => {
    const match = useRouteMatch();

    const [pokemons, setPokemons]= useState([])
  
    const handlerChangePokemons = (val)=>{
      setPokemons(val);
    }

    return (
        <PokemonContext.Provider value={{ pokemons, onChangePokemons: handlerChangePokemons }} >
            <Switch>
                <Route path={`${match.path}/`} exact component={StartPage} />
                <Route path={`${match.path}/board`} component={BoardPage} />
                <Route path={`${match.path}/finish`} component={FinishPage} />
                <Link to="/"> Back </Link>
            </Switch>
        </PokemonContext.Provider>
    );
};


export default GamePage;
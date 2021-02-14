import { useState, /*useEffect*/ } from 'react';
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";
import { PokemonContext } from '../../context/pokemonContext';
import BoardPage from './routes/Board';
import FinishPage from './routes/Finish';
import StartPage from './routes/Start';

//import s from './style.module.css'

const GamePage = () => {
    const match = useRouteMatch();    

    const [selectedPokemons, setSelectedPokemons] = useState({});
    const [player2Pokemons, setPlayer2Pokemons] = useState({});
    const [gameState, setGameState] = useState(null);

    //console.log(selectedPokemons)
   
    const handlerSelectedPokemons = (key, pokemon) => {
        setSelectedPokemons(prevState=>{
            if(prevState[key]){
                const copyState = {...prevState};
                delete copyState[key];

                return copyState;
            }
            return {
                ...prevState,
                [key]:pokemon
            }
        })
    }

    const handlerClearSelectedPokemons = () => {
        setSelectedPokemons({});
    }

    const handleChangeGameState = (state) => {
        setGameState(state);
    }

    const handlerPlayer2Pokemons = (pokemons) => {
        // console.log(pokemons);
        setPlayer2Pokemons({...pokemons});
        // console.log(player2Pokemons);
    }
    return (
        <PokemonContext.Provider value={{
            pokemons: selectedPokemons,
            player2Pokemons: player2Pokemons,
            gameState : gameState,
            onSelectedPokemons: handlerSelectedPokemons,
            onClearSelectedPokemons: handlerClearSelectedPokemons,
            onPlayer2Pokemons: handlerPlayer2Pokemons,
            onChangeGameState: handleChangeGameState
        }} >
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
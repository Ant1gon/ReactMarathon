import { React, useContext, useState/*, useEffect*/ } from 'react';
import { Link, useHistory } from "react-router-dom";
import PokemonCard from '../../../../components/PokemonCard';
import { PokemonContext } from '../../../../context/pokemonContext';
import { FirebaseContext } from '../../../../context/firebaseContext';
import s from './style.module.css';

const FinishPage = () => {
  const history = useHistory();
  const context = useContext(PokemonContext);
  const firebase = useContext(FirebaseContext);
  //const pokemonsContext = useContext(PokemonContext);
  const player1pokemons = { ...Object.values(context.pokemons) };
  const player2pokemons = { ...context.player2Pokemons.data };
  const [takePokemon, setTakePokemon] = useState({});

  if (Object.keys(player1pokemons).length < 5 && Object.keys(player2pokemons).length < 5) {
    history.replace('/game');
  }

  const handleEndGame = () => {
    if (context.gameState) {
      if (!takePokemon.selected) {
        alert("You must select the pokemon to take!");
        return;
      }
      else {
        firebase.addPokemon(Object.values(player2pokemons).filter(item => item.id === takePokemon.id)[0]);
      }
    }
    context.onClearSelectedPokemons();
    history.replace('/game');
  }

  const handleChoicePokemon = (item) => {
    setTakePokemon(prevState => {
      return {
        ...item,
        selected: prevState.id === item.id ? !prevState.selected : true
      }
    });
  }

  return (
    <>
      <div className={s.flex}>
        {
          Object.entries(player1pokemons).map(([key, item]) => {
            return <PokemonCard
              key={key}
              id={item.id}
              name={item.name}
              values={item.values}
              img={item.img}
              type={item.type}
              className={s.card}
              minimize={false}
              isActive={true}
              isSelected={item.selected} />
          })
        }
      </div>
      <div className={s.addBtn}>
        <Link to="/"> Home </Link>
        <button onClick={handleEndGame} >End Game</button>
        {/* <Link to="/game"> End game </Link> */}
      </div>
      <div className={s.flex}>
        {
          Object.entries(player2pokemons).map(([key, item]) => {
            return <PokemonCard
              key={key}
              id={item.id}
              name={item.name}
              values={item.values}
              img={item.img}
              type={item.type}
              className={s.card}
              minimize={false}
              isActive={true}
              isSelected={item.id === takePokemon.id ? takePokemon.selected : item.selected}
              handleCardClick={() => {
                if (context.gameState) handleChoicePokemon(item);
              }} />
          })
        }
      </div>
    </>
  )
}

export default FinishPage;
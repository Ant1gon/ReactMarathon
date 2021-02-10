import {React, useContext} from 'react';
//import { Link } from "react-router-dom";
import PokemonCard from '../../../components/PokemonCard';
import { PokemonContext } from '../../../context/pokemonContext';
import s from './style.module.css';

const BoardPage = () => {
  const context = useContext(PokemonContext);
  console.log(context);
  return (
      <div className={s.root}>
        <div className={s.playerOne}>
          {
            context.pokemons.map(item=> {
              return <PokemonCard key={item.id}
                    id={item.id}
                    name={item.name}
                    values={item.values}
                    img={item.img}
                    type={item.type}
                    className="pokemonCardSize"
                    minimize={true}
                    active={item.active}
                    selected={item.selected}/>
            })
          }
          
        </div>
        <div className={s.board}>
          <div className={s.boardPlate}>1</div>
          <div className={s.boardPlate}>2</div>
          <div className={s.boardPlate}>3</div>
          <div className={s.boardPlate}>4</div>
          <div className={s.boardPlate}>5</div>
          <div className={s.boardPlate}>6</div>
          <div className={s.boardPlate}>7</div>
          <div className={s.boardPlate}>8</div>
          <div className={s.boardPlate}>9</div>
        </div>
      </div>
  );
};

export default BoardPage;
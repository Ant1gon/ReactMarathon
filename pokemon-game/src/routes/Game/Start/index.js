import { useState, useEffect, useContext } from 'react';
import { Link } from "react-router-dom";
import PokemonCard from '../../../components/PokemonCard';
import Layout from '../../../components/Layout';
import { PokemonContext } from '../../../context/pokemonContext';
//import POKEMONS from '../../../components/data/pokemons.json';

import { database } from "../../../service/firebase";

import bg3 from '../../../assets/bg3.jpg';
import s from './style.module.css'

const StartPage = () => {
    const context = useContext(PokemonContext);
    console.log(context);

    const [pokemons, setPokemons] = useState({});
    useEffect(() => {
        database.ref('pokemons').once('value', (snapshot) => {
            setPokemons(snapshot.val());
        })
    }, [])

    const handleCardClick = (id) => {
        setPokemons(prevState => {
            return Object.entries(prevState).reduce((acc, item) => {
                const pokemon = { ...item[1] };
                if (pokemon.id === id) {
                    pokemon.selected = !pokemon.selected;
                    //database.ref('pokemons/' + item[0]).set(pokemon);
                };
                acc[item[0]] = pokemon;
                return acc;
            }, {});
        });
    }

    const selectedPoks= ()=>{
        const selectedPokemons =  Object.values(pokemons).filter(item=> item.selected);
        context.onChangePokemons(selectedPokemons);
    }

    const handlerAddPokeButton = () => {
        const newKey = database.ref().child('pokemons').push().key;
        let id = 25;
        let pokObj = { ...pokemons };
        // eslint-disable-next-line
        Object.entries(pokemons).map(([key, item]) => {
            if (item.id === id) {
                let lastId = pokemons[Object.keys(pokemons)[Object.keys(pokemons).length - 1]].id;
                pokObj[newKey] = { ...pokObj[key] };
                pokObj[newKey].id = lastId + (lastId < 100 ? 100 : 1);
                database.ref('pokemons/' + newKey).set(pokObj[newKey]); //.then(setPokemons(pokObj));            
            }
        });
        setPokemons(pokObj);
    }

    return (
        <>
            <Layout id="cards" title="Card" colorTitle="#FEFEFE" urlBg={bg3}  >
                <div className={s.addBtn}>
                    <button><Link to="/game/board" className={s.addBtn}  onClick={selectedPoks}> Start </Link></button>
                    <button className={s.addBtn} onClick={handlerAddPokeButton}>Add Card</button>               
                </div>
                <div className={s.flex}>
                    {
                        Object.entries(pokemons).map(([key, item]) => {
                            return <PokemonCard
                                key={key}
                                id={item.id}
                                name={item.name}
                                values={item.values}
                                img={item.img}
                                type={item.type}
                                className="pokemonCardSize"
                                minimize={true}
                                active={item.active}
                                selected={item.selected}
                                handleCardClick={handleCardClick} />
                        })
                    }
                </div>
            </Layout>
            <Link to="/"> Back </Link>
        </>
    )
};

export default StartPage;
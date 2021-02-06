
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import PokemonCard from '../../components/PokemonCard';
import Layout from '../../components/Layout';
//import POKEMONS from '../../components/data/pokemons.json';

import { database } from "../../service/firebase";

import bg3 from '../../assets/bg3.jpg';
import s from './style.module.css'
const GamePage = () => {
    const [pokemons, setPokemons] = useState({});
    useEffect(() => {
        database.ref('pokemons').once('value', (snapshot) => {
            setPokemons(snapshot.val());
        })
    }, [])

    const handleCardClick = (id, baseKey) => {
        setPokemons(prevState => {
            return Object.entries(prevState).reduce((acc, item) => {
                const pokemon = { ...item[1] };
                if (pokemon.id === id) {
                    pokemon.active = !pokemon.active;
                    database.ref('pokemons/'+ baseKey).set(pokemon);
                };

                acc[item[0]] = pokemon;
                
                return acc;
            }, {});
        });

        // setPokemons((pokemons) => {
        //     return pokemons.map(item => item.id === id ? ({ ...item, isActive: !item.isActive }) : item);
        // })
    }
    
    
    const handlerAddPokeButton = ()=>{
        const newKey = database.ref().child('pokemons').push().key;        
        let id = 25;
        let pokObj = {...pokemons}; 
        Object.entries(pokemons).map(([key, item]) => {
            if(item.id === id ){
                let lastId= pokemons[Object.keys(pokemons)[Object.keys(pokemons).length - 1]].id;
                pokObj[newKey] = {...pokObj[key]};
                pokObj[newKey].id = lastId + (lastId < 100 ?  100 : 1);   
                database.ref('pokemons/' + newKey).set(pokObj[newKey]);            
            }
        });        
        setPokemons(pokObj);
    }

    
    return (
        <>
            <Layout id="cards" title="Card" colorTitle="#FEFEFE" urlBg={bg3}  >
                <div className={s.addBtn}>
                    <button className={s.addBtn} onClick={handlerAddPokeButton}>Add Card</button>
                </div>
                <div className={s.flex}>
                    {
                        Object.entries(pokemons).map(([key, item]) => {
                            return <PokemonCard
                                baseKey={key}
                                key={item.id}
                                id={item.id}
                                name={item.name}
                                values={item.values}
                                img={item.img}
                                type={item.type}
                                active={item.active || false}
                                handleCardClick={handleCardClick} />
                        })
                    }
                </div>
            </Layout>
            <Link to="/"> Back </Link>
        </>
    )
};

export default GamePage;
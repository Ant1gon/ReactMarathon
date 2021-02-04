import { useState } from 'react';
import { Link } from "react-router-dom";
import PokemonCard from '../../components/PokemonCard';
import Layout from '../../components/Layout';
import POKEMONS from '../../components/data/pokemons.json';

import bg3 from '../../assets/bg3.jpg';
import s from './style.module.css'
const GamePage = () => {
    const [pokemons, setPokemons] = useState(POKEMONS);
    const handleCardClick = (id) => {
        setPokemons((pokemons) => {
            const index = pokemons.findIndex((el) => el.id === id);
            const oldItem = pokemons[index];
            const newItem = { ...oldItem, isActive: !oldItem.isActive };
            const newArray = [
                ...pokemons.slice(0, index),
                newItem,
                ...pokemons.slice(index + 1),
            ];
            return newArray;
        })
    }
    return (
        <>
            <Layout id="cards" title="Card" colorTitle="#FEFEFE" urlBg={bg3}  >
                <div className={s.flex}>
                    {
                        pokemons.map(item =>
                            <PokemonCard
                                key={item.id}
                                id={item.id}
                                name={item.name}
                                values={item.values}
                                img={item.img}
                                type={item.type}
                                isActive={item.isActive || false}
                                handleCardClick={handleCardClick} />)
                    }
                </div>
            </Layout>
            <Link to="/"> Back </Link>
        </>
    )
};

export default GamePage;
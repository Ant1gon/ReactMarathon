import { useState, useEffect, useContext } from 'react';
import { Link, useHistory } from "react-router-dom";
import PokemonCard from '../../../../components/PokemonCard';
import Layout from '../../../../components/Layout';
import { PokemonContext } from '../../../../context/pokemonContext';
import bg3 from '../../../../assets/bg3.jpg';
import s from './style.module.css'
import { FirebaseContext } from '../../../../context/firebaseContext';

const StartPage = () => {
    // console.log('loaded1');
    // console.log( useContext(PokemonContext));
    const firebase = useContext(FirebaseContext);
    const pokemonsContext = useContext(PokemonContext);
    const history = useHistory();
    const [pokemons, setPokemons] = useState({});
    // console.log(pokemons);
    useEffect(() => {
        firebase.getPokemonSoket((pokemons) => {
            setPokemons(pokemons);
        });
        return () => firebase.offPokemonSoket();   
        // eslint-disable-next-line     
    }, [])

    const handleChangeSelected = (key) => {
        const pokemon = { ...pokemons[key] }
        pokemonsContext.onSelectedPokemons(key, pokemon);

        setPokemons(prevState => ({
            ...prevState,
            [key]: {
                ...prevState[key],
                selected: !prevState[key].selected
            }
        }));
    }

    const handleStartGameClick = () => {
        history.push('/game/board');
    }

    return (
        <>
            <Layout id="cards" title="Card" colorTitle="#FEFEFE" urlBg={bg3}  >
                <div className={s.addBtn}>
                    <button
                        onClick={handleStartGameClick}
                        disabled={Object.keys(pokemonsContext.pokemons).length < 5}
                    >Start </button>
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
                                className={s.card}
                                minimize={false}
                                isActive={true}
                                isSelected={item.selected}
                                handleCardClick={() => {
                                    if (Object.keys(pokemonsContext.pokemons).length < 5 || item.selected) {
                                        handleChangeSelected(key);
                                    }
                                }} />
                        })
                    }
                </div>
            </Layout>
            <Link to="/"> Back </Link>
        </>
    )
};

export default StartPage;
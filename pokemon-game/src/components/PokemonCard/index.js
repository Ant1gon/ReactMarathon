//import { useState } from 'react';
import cn from 'classnames';

import cardBackSideImg from './assets/card-back-side.jpg';
import s from './style.module.css';

const PokemonCard = ({ name, img, id, type, values, isActive = true, handleCardClick, minimize, selected = false, className /* ...props*/ }) => {
    //console.log('####: props', props);
    const onClick = () => {
        handleCardClick && handleCardClick(id);
    }
    
    return (
        <div className={s.root} onClick={onClick}>
            <div className={cn(s[className], s.pokemonCard,  { [s.selected]: selected }, { [s.active]: true,  [s.card]: minimize/* isActive*/ })}>
                <div className={s.cardFront}>
                    <div className={cn(s.wrap, s.front)}>
                        <div className={cn(s.pokemon, s[type])}>
                            <div className={s.values}>
                                <div className={cn(s.count, s.top)}>{values.top}</div>
                                <div className={cn(s.count, s.right)}>{values.right}</div>
                                <div className={cn(s.count, s.bottom)}>{values.bottom}</div>
                                <div className={cn(s.count, s.left)}>{values.left}</div>
                            </div>
                            <div className={s.imgContainer}>
                                <img src={img} alt={name} />
                            </div>
                            <div className={s.info}>
                                <span className={s.number}>#{id}</span>
                                <h3 className={s.name}>{name}</h3>
                                <small className={s.type}>Type: <span>{type}</span></small>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={s.cardBack}>
                    <div className={`${s.wrap} ${s.back}`}>
                        <img src={cardBackSideImg} alt="Сard Backed" />
                    </div>
                </div>

            </div>
        </div>
    )
};

export default PokemonCard;
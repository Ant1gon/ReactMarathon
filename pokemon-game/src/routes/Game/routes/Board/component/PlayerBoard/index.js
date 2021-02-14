import { React, useState } from 'react';
import PokemonCard from '../../../../../../components/PokemonCard';
import cn from 'classnames';
import s from './style.module.css';

const PlayerBoard = ({ player, cards, onClickCard, move, ...props }) => {
    const [isSelected, setSelected] = useState(null);
    const hanlde = (id) => {
        isSelected === id ? setSelected(null) : setSelected(id);
    }
    return (
        <>
            {
                cards.map((item) => (
                    <div
                        key={item.id}
                        className={cn(s.cardBoard, { [s.selected]: isSelected === item.id })}
                        onClick={() => {
                            if (move) {
                                hanlde(item.id);
                                onClickCard && onClickCard({
                                    player,
                                    ...item
                                });
                            }
                        }}>
                        <PokemonCard
                            key={item.id}
                            name={item.name}
                            img={item.img}
                            id={item.id}
                            values={item.values}
                            type={item.type}
                            minimize
                            isActive />
                    </div>
                ))
            }
        </>
    );
};

export default PlayerBoard;
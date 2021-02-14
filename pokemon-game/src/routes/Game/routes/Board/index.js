import { React, useState, useContext, useEffect } from 'react';
import { useHistory /*, useRouteMatch*/ } from "react-router-dom";
import PokemonCard from '../../../../components/PokemonCard';
import { PokemonContext } from '../../../../context/pokemonContext';
import PlayerBoard from './component/PlayerBoard';
import s from './style.module.css';

const counterWin = (board, player1, player2) => {
  let player1Count = player1.length;
  let player2Count = player2.length;

  board.forEach(item => {
    if (item.card.possession === 'red') {
      player2Count++;
    } else {
      player1Count++;
    }
  });
  return [player1Count, player2Count];
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const BoardPage = () => {
  const { pokemons, /*player1Pokemons,*/ onPlayer2Pokemons, onChangeGameState } = useContext(PokemonContext);

  const [board, setBoard] = useState([]);
  // eslint-disable-next-line
  const [player1, setPlayer1] = useState(() => {
    return Object.values(pokemons).map(item => ({
      ...item,
      possession: 'blue'
    }))
  });
  const [player2, setPlayer2] = useState([]);

  const [choiceCard, setChoiceCard] = useState(null);
  const [steps, setSteps] = useState(0);

  const [player1move, setPlayer1move] = useState(true);

  const history = useHistory();
  useEffect(() => {
    async function fetchData() {
      const boardResponse = await fetch('https://reactmarathon-api.netlify.app/api/board');
      const boardRequest = await boardResponse.json();
      setBoard(boardRequest.data);

      const player2Response = await fetch('https://reactmarathon-api.netlify.app/api/create-player');
      const player2Request = await player2Response.json();
      await onPlayer2Pokemons(player2Request);
      setPlayer2(() => {
        return player2Request.data.map(item => ({
          ...item,
          possession: 'red'
        }))
      });
    }
    fetchData();
    if (getRandomInt(100) < 50) {
      setPlayer1move(true);
    }
    else { setPlayer1move(false); }
  }, [])

  if (Object.keys(pokemons).length === 0) {
    history.replace('/game');
  }

  const handleClickBoardPlate = async (position) => {
    if (choiceCard) {
      const params = {
        position,
        card: choiceCard,
        board
      }

      const res = await fetch('https://reactmarathon-api.netlify.app/api/players-turn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
      });

      const request = await res.json();

      if (choiceCard.player === 1) {
        setPlayer1(prevState => prevState.filter(item => item.id !== choiceCard.id))
      }
      if (choiceCard.player === 2) {
        setPlayer2(prevState => prevState.filter(item => item.id !== choiceCard.id))
      }

      setBoard(request.data);
      setSteps(prevState => {
        const count = prevState + 1;
        return count;
      });
      setChoiceCard(null);
      handleOnMove();
    }
    else {
      alert("Choice card first!");
    }
  }

  useEffect(() => {
    if (steps === 9) {
      const [count1, count2] = counterWin(board, player1, player2);
      if (count1 > count2) {
        onChangeGameState(true);
        alert('Win');
      } else if (count1 < count2) {
        onChangeGameState(false);
        alert('Lose');
      } else {
        onChangeGameState(null);
        alert('Draw');
      }
      history.push('/game/finish');
    }
  }, [steps])

  const handleOnMove = () => {
    setPlayer1move(prevState => !prevState);
  }

  return (
    <>
      <div className={s.root}>
        <div className={s.playerOne}>
          <PlayerBoard key={1} player={1} cards={player1} onClickCard={(card) => setChoiceCard(card)} move={player1move} />
        </div>
        <div className={s.board}>
          {
            board.map(item => (
              <div
                key={item.position}
                className={s.boardPlate}
                onClick={() => !item.card && handleClickBoardPlate(item.position)}
              >
                {
                  item.card && <PokemonCard key={item.id} {...item.card} isActive minimize />
                }
              </div>
            ))
          }
        </div>
        <div className={s.playerTwo}>
          <PlayerBoard key={2} player={2} cards={player2} onClickCard={(card) => setChoiceCard(card)} move={!player1move} />
        </div>
      </div>
      <div className={s.whoMove}>{player1move ? "Player 1 move now!" : "Player 2 move now!"}</div>
    </>
  );
};

export default BoardPage;
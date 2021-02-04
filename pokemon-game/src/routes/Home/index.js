import React from 'react';
import Header from '../../components/Header';
import Layout from '../../components/Layout';
// import Footer from '../../components/Footer';
// import MenuHeader from '../../components/MenuHeader';
// import PokemonCard from '../../components/PokemonCard';
// import POKEMONS from '../../components/data/pokemons.json';
// import bg3 from '../../assets/bg3.jpg';
// import s from './style.module.css';


const HomePage = ({onChangePage}) => {
  // const handleClickButton = (page) => {
  //   onChangePage && onChangePage(page);
  // }
  // const handleNavigate = (page) => {
  //   //console.log("### home - " + page);
  //   onChangePage && onChangePage(page);
  // }

  return (
    //React.fragment
    <>
      <Header
        title="Pokemon Game"
        descr="Card Game"
        // onClickButton={handleClickButton}
      />
      <Layout id="rules" title="Rules" colorBg="rgb(116 225 255)" >
        <p>In the game two players face off against one another, one side playing as "blue", the other as "red" on a 3x3 grid.</p>
        <p>Each player has five cards in a hand and the aim is to capture the opponent's cards by turning them into the player's own color of red or blue.</p>
      </Layout>
      {/* <Layout id="cards" title="Card" colorTitle="#FEFEFE" urlBg={bg3}  >
        <div className={s.flex}>
          {          
            POKEMONS.map(item => <PokemonCard key={item.id} id={item.id} name={item.name} values={item.values} img={item.img} type={item.type} />)
          }
        </div>
      </Layout> */}
      <Layout id="about" title="Full rules" colorBg="rgb(116 225 255)"  >
        <p>To win, a majority of the total ten cards played (including the one card that is not placed on the board) must be of the player's card color. </p>
        <p>To do this, the player must capture cards by placing a card adjacent to an opponent's card whereupon the 'ranks' of the sides where the two cards touch will be compared.</p>
        <p>If the rank of the opponent's card is higher than the player's card, the player's card will be captured and turned into the opponent's color. If the player's rank is higher, the opponent's card will be captured and changed into the player's color instead. </p>
      </Layout>
    </>
  )
}

export default HomePage;
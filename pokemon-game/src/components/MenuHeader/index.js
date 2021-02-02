import cn from 'classnames';
import { useState } from 'react';
import Menu from '../Menu';
import Navbar from '../Navbar';
import s from './style.module.css'
const MenuHeader = ({ handleNavigate }) => {
  const [isMenuActive, setMenuActive] = useState(false);
  const handleClickButton = (state) => {
    setMenuActive(state);
  }
  const handleChangePage = (page) => {
    handleNavigate && handleNavigate(page);
  }
  
  return (
    <>
      <Menu state= {isMenuActive} handleChangePage = {handleChangePage} />
      <Navbar onClickMenuButton = {handleClickButton} />
    </>
  );
};

export default MenuHeader;


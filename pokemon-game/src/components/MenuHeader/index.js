
//import cn from "classnames";
import { useState } from "react";
import Menu from "../Menu";
import NavBar from "../Navbar";
//import s from "./style.module.css";

const MenuHeader = ({ bgActive }) => {
  const [isOpen, setOpen] = useState(null);

  const handleClickHamburg = () => {
    setOpen(prevState => !prevState);
  };

  return (
    <>
      <Menu isOpen={isOpen} onClickLink={handleClickHamburg} />
      <NavBar isOpen={isOpen} bgActive={bgActive}  onClickHamburg={handleClickHamburg} />
    </>
  );
};

export default MenuHeader;

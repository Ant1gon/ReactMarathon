//import { useState } from "react";

import { Link } from "react-router-dom";
import cn from "classnames";
import s from "./style.module.css";
const NavBar = ({ isOpen, bgActive = false, onClickHamburg }) => {
  return (
    <nav id={s.navbar} className={cn({ [s.bgActive]: bgActive })}>
      <div className={s.navWrapper}>
        <Link to="/" className={s.brand}>LOGO</Link>
        <a
          href="#game"
          className={cn(s.menuButton, { [s.active]: isOpen })}
          onClick={onClickHamburg}
        >
          <span />
        </a>
      </div>
    </nav>
  );
};

export default NavBar;

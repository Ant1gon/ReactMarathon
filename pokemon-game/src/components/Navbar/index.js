import { useState } from 'react';
import cn from 'classnames';
import s from './style.module.css'
const Navbar = ({ title = false, descr = false, onClickMenuButton }) => {
  const [isActive, setActive] = useState(false);
    const handleMenuClick = () => {
        setActive(!isActive);
        onClickMenuButton && onClickMenuButton(!isActive);
    }

  return (
    <nav id={s.navbar}>
      <div className={s.navWrapper}>
        <p className={s.brand}>
          LOGO
        </p>
        <a className={cn(s.menuButton, isActive ? s.active : s.deactive)} onClick={handleMenuClick}>
          <span />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;


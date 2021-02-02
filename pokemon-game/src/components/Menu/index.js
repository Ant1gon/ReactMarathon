import cn from 'classnames';
import s from './style.module.css'
const Menu = ({ state, handleChangePage }) => {
  const handleHomeClick = () => {
    handleChangePage && handleChangePage("home");
  }
  const handleGameClick = () => {
    handleChangePage && handleChangePage("game");
  }
  return (
    <div className={cn(s.menuContainer, state ? s.active : s.deactive)}>
      <div className={s.overlay} />
      <div className={s.menuItems}>
        <ul>
          <li>
            <a href="#welcome" onClick={handleHomeClick}>
              HOME
                </a>
          </li>
          <li>
            <a href="#game" onClick={handleGameClick}>
              GAME
                </a>
          </li>
          <li>
            <a href="#about">
              ABOUT
                </a>
          </li>
          <li>
            <a href="#contact">
              CONTACT
                </a>
          </li>
        </ul>
      </div>
    </div>)
};

export default Menu;


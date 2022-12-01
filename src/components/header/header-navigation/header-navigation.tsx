import { generatePath, Link } from 'react-router-dom';
import { AppRoute } from '../../../consts/const';


function HeaderNavigation () {
  return (
    <nav className="main-nav header__main-nav" data-testid="main-nav">
      <ul className="main-nav__list">
        <li className="main-nav__item"><Link className="main-nav__link" to={generatePath(AppRoute.Catalog, {id: '1'})}>Каталог</Link>
        </li>
        <li className="main-nav__item"><a className="main-nav__link" href="#">Гарантии</a>
        </li>
        <li className="main-nav__item"><a className="main-nav__link" href="#">Доставка</a>
        </li>
        <li className="main-nav__item"><a className="main-nav__link" href="#">О компании</a>
        </li>
      </ul>
    </nav>
  );
}

export {HeaderNavigation};

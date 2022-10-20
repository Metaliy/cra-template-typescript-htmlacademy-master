import { Link } from 'react-router-dom';
import { HeaderNavigationComponent } from './header-navigation/header-navigation';
import { SearchFormComponent } from './search-form/search-form';

function HeaderComponent () {
  return (
    <header className="header" id="header">
      <div className="container">
        <Link className="header__logo" to="/catalog/page_1" aria-label="Переход на главную">
          <svg width="100" height="36" aria-hidden="true">
            <use xlinkHref="#icon-logo"></use>
          </svg>
        </Link>
        <HeaderNavigationComponent />
        <div className="form-search">
          <SearchFormComponent />
        </div>
        <a className="header__basket-link" href="#">
          <svg width="16" height="16" aria-hidden="true">
            <use xlinkHref="#icon-basket"></use>
          </svg>
        </a>
      </div>
    </header>
  );
}

export {HeaderComponent};

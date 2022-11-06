import { Link } from 'react-router-dom';
import { HeaderNavigation } from './header-navigation/header-navigation';
import { SearchForm } from './search-form/search-form';

function Header () {
  return (
    <header className="header" id="header" data-testid="header">
      <div className="container">
        <Link className="header__logo" to="/catalog/page_1" aria-label="Переход на главную">
          <svg width="100" height="36" aria-hidden="true">
            <use xlinkHref="#icon-logo"></use>
          </svg>
        </Link>
        <HeaderNavigation />
        <div className="form-search">
          <SearchForm />
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

export {Header};

import { LogoComponent } from '../logo/logo';
import { SearchFormComponent } from './search-form/search-form';

function HeaderComponent () {
  return (
    <header className="header" id="header">
      <div className="container">
        <LogoComponent />
        <HeaderComponent />
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

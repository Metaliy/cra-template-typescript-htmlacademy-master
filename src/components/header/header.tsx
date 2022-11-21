import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/hooks';
import { getSearchedCameras } from '../../store/searched-cameras-slice/selectors';
import { HeaderNavigation } from './header-navigation/header-navigation';
import { SearchForm } from './search-form/search-form';

function Header () {

  const searchedCamerasList = useAppSelector(getSearchedCameras);


  return (
    <header className="header" id="header" data-testid="header">
      <div className="container">
        <Link className="header__logo" to="/catalog/page_1" aria-label="Переход на главную">
          <svg width="100" height="36" aria-hidden="true">
            <use xlinkHref="#icon-logo"></use>
          </svg>
        </Link>
        <HeaderNavigation />
        <SearchForm searchedCamerasList={searchedCamerasList} />
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

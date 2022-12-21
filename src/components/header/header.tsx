import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { AppRoute } from '../../consts/const';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { getSearchedCameras } from '../../store/slices/searched-cameras-slice/selectors';
import { HeaderNavigation } from './header-navigation/header-navigation';
import { SearchForm } from './search-form/search-form';
import { addedItemsCount } from '../../store/slices/basket-slice/basket-slice';
import { getAddedOnBasketItemsId, getNumberOfItemsAdded } from '../../store/slices/basket-slice/selectors';

function Header () {

  const searchedCamerasList = useAppSelector(getSearchedCameras);
  const camerasOnBasket = useAppSelector(getAddedOnBasketItemsId);
  const addedCamerasCount = useAppSelector(getNumberOfItemsAdded);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(addedItemsCount());
  }, [dispatch, camerasOnBasket]);

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
        <Link className="header__basket-link" to={AppRoute.Basket}>
          <svg width="16" height="16" aria-hidden="true">
            <use xlinkHref="#icon-basket"></use>
          </svg>
          {addedCamerasCount !== 0 ? <span className="header__basket-count">{addedCamerasCount}</span> : ''}
        </Link>
      </div>
    </header>
  );
}

export {Header};

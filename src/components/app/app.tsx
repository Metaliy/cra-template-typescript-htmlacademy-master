import { useEffect } from 'react';
import { Route } from 'react-router';
import { Routes } from 'react-router-dom';
import { AppRoute } from '../../consts/const';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { BasketPage } from '../../pages/basket/basker';
import { CatalogPage } from '../../pages/catalog/catalog';
import { NotFoundPage } from '../../pages/not-found/not-found';
import { ProductPage } from '../../pages/product/product';
import { fetchCamerasAction } from '../../store/api-actions';
import { getCamerasListLoadingStatus, getPromoCameraListLoadingStatus } from '../../store/camera-data/selectors';
import { getCurrentPage } from '../../store/catalog-process/selectors';
import HistoryRouter from '../history-router/history-router';
import { LoaderComponent } from '../loading-screen/loading-screen';
import browserHistory from './browser-history';

function App(): JSX.Element {

  const currentPage = useAppSelector(getCurrentPage);

  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(getCamerasListLoadingStatus);
  const isPromoCameraLoading = useAppSelector(getPromoCameraListLoadingStatus);

  useEffect(() => {
    if(!isLoading || !isPromoCameraLoading) {
      dispatch(fetchCamerasAction(currentPage));
    }
  }, [dispatch, currentPage]);

  if(isPromoCameraLoading || isLoading) {
    return (
      <LoaderComponent />
    );
  }

  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route
          path={AppRoute.Catalog}
          element={<CatalogPage/>}
        />
        <Route
          path={AppRoute.Product}
          element={<ProductPage/>}
        />
        <Route
          path={AppRoute.Basket}
          element={<BasketPage/>}
        />
        <Route
          path={'/*'}
          element={<NotFoundPage/>}
        />
      </Routes>
    </HistoryRouter>
  );
}

export default App;

import { Route } from 'react-router';
import { generatePath, Navigate, Routes } from 'react-router-dom';
import { AppRoute } from '../../consts/const';
import { BasketPage } from '../../pages/basket/basker';
import { CatalogPage } from '../../pages/catalog/catalog';

import { NotFoundPage } from '../../pages/not-found/not-found';
import { ProductPage } from '../../pages/product/product';


function App(): JSX.Element {

  return (

    <Routes>
      <Route
        path={AppRoute.Main}
        element={
          <Navigate
            to={{
              pathname: generatePath(AppRoute.Catalog, {id: '1'})
            }}
          />
        }
      />
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
  );
}

export default App;

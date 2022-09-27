import { Route } from 'react-router';
import { Routes } from 'react-router-dom';
import { BasketPage } from '../../pages/basket/basker';
import { CatalogPage } from '../../pages/catalog/catalog';
import { ProductPage } from '../../pages/product/product';
import HistoryRouter from '../history-router/history-router';
import browserHistory from './browser-history';

function App(): JSX.Element {
  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route
          path={'/'}
          element={<CatalogPage/>}
        />
        <Route
          path={'/product'}
          element={<ProductPage/>}
        />
        <Route
          path={'/basket'}
          element={<BasketPage/>}
        />
      </Routes>
    </HistoryRouter>
  );
}

export default App;

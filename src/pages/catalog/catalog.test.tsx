import { configureMockStore } from '@jedmao/redux-mock-store';
import { screen } from '@testing-library/react';
import thunk from 'redux-thunk';
import { NameSpace } from '../../consts/const';
import { renderFakeApp } from '../../mock/fake-app/fake-app';
import { getFakeCamera, getFakePromoCamera } from '../../mock/mock';
import { createAPI } from '../../services/api';
import { CatalogPage } from './catalog';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);


const store = mockStore({
  [NameSpace.Catalog]: {
    currentPage: 1,
  },
  [NameSpace.Promo]: {
    promoCamera: getFakePromoCamera(),
  },
  [NameSpace.Cameras]: {
    cameras: [getFakeCamera()],
  },

});
describe('Catalog page', () => {
  it('should render "Catalog page"', async () => {
    renderFakeApp(<CatalogPage/>, {
      mockStore: store
    });

    expect(await screen.findByTestId('catalog')).toBeInTheDocument();
  });
});

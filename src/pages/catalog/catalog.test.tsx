import { configureMockStore } from '@jedmao/redux-mock-store';
import { screen } from '@testing-library/react';
import thunk from 'redux-thunk';
import { LoadingStatus, NameSpace, SortOrderParameter, SortTypeParameter } from '../../consts/const';
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
    sort: {
      sortType: SortTypeParameter.Price,
      order:  SortOrderParameter.LowToHigh
    },
    filters: {
      priceMin: [],
      priceMax: [],
      category: [],
      filterType: [],
      level: []
    }
  },
  [NameSpace.Promo]: {
    promoCamera: getFakePromoCamera(),
  },
  [NameSpace.Cameras]: {
    cameras: [getFakeCamera()],
    camerasCount: 0,
    minCameraPrice: 0,
    maxCameraPrice: 0
  },
  [NameSpace.SearchedCameras]: {
    searchedCameras: [],
  },
});

const mockState = {
  [NameSpace.Cameras]: {
    camerasListLoadingStatus: LoadingStatus.Pending,
  },
};
describe('Catalog page', () => {
  it('should render "Catalog page"', async () => {
    renderFakeApp(<CatalogPage/>, {
      mockStore: store
    });

    expect(await screen.findByTestId('catalog')).toBeInTheDocument();
  });
  it('should render "Loader"', async () => {
    renderFakeApp(<CatalogPage/>, {
      initialState: mockState
    });

    expect(await screen.findByTestId('catalog')).not.toBeInTheDocument();
  });
});

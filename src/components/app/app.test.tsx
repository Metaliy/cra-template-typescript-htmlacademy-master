import { screen } from '@testing-library/react';
import { AppRoute, LoadingStatus, NameSpace } from '../../consts/const';
import { fakeReviewList, getFakeCamera, getFakeCamerasReview, getFakePromoCamera } from '../../mock/mock';
import App from './app';
import { generatePath } from 'react-router-dom';
import { renderFakeApp } from '../../mock/fake-app/fake-app';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { createAPI } from '../../services/api';
import 'react-intersection-observer/test-utils';

const fakeCamera = getFakeCamera();
const fakeCameraList = [getFakeCamera(), getFakeCamera()];
const fakesimilarCameras = [getFakeCamera(), getFakeCamera()];
const fakePromoCamera = getFakePromoCamera();


const mockState = {
  [NameSpace.CatalogData]: {
    cameras: fakeCameraList,
    isCamerasListLoading: LoadingStatus.Fulfilled,
    promoCamera: fakePromoCamera,
    isPromoCameraLoading: LoadingStatus.Fulfilled
  },
  [NameSpace.CatalogProcess]: {
    currentPage: 1
  },
  [NameSpace.ProductData]: {
    selectedCamera: fakeCamera,
    isSelectedCameraLoading: LoadingStatus.Fulfilled,
    similarCameras: fakesimilarCameras,
    isSimilarCamerasLoading: LoadingStatus.Fulfilled,
    reviewsList: fakeReviewList,
    isReviewsListLoading: LoadingStatus.Fulfilled,
  },
  [NameSpace.ProductProcess]: {
    reviewSentStatus: false,
  }
};

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);

const store = mockStore({
  [NameSpace.ProductData]: {
    selectedCamera: getFakeCamera(),
    similarCameras: [getFakeCamera()],
    reviewsList: [getFakeCamerasReview()]
  },
  [NameSpace.CatalogProcess]: {
    currentPage: 1
  }
});


describe('Application Routing', () => {
  it('should render "MainPage" when user navigate to "/"', () => {
    renderFakeApp(<App />, {
      initialRoute: AppRoute.Main,
      initialState: mockState
    });

    expect(screen.getByText(/УПС.../i)).toBeInTheDocument();
  });

  it('should render "CatalogPage" when user navigate to "/catalog"', () => {
    renderFakeApp(<App />, {
      initialRoute: generatePath(AppRoute.Catalog, {id: 'page_1'}),
      initialState: mockState
    });

    expect(screen.getByText(/Каталог фото- и видеотехники/i)).toBeInTheDocument();
  });
  it('should render "NotFoundPage" when user navigate to non-existent route', () => {
    renderFakeApp(<App />, {
      initialRoute: '/wrong-route',
      initialState: mockState
    });

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText(/Каталог/i)).toBeInTheDocument();
  });
  it('should render "ProductPage" when user navigate to "/product/:id"', async () => {

    renderFakeApp(<App />, {
      initialRoute: generatePath(AppRoute.Product, {id: String(fakeCamera.id)}),
      mockStore: store
    });

    expect(screen.getByText(/Похожие товары/i)).toBeInTheDocument();
  });
});

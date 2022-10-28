import { screen } from '@testing-library/react';
import { AppRoute, LoadingStatus } from '../../consts/const';
import { fakeCamerasList, fakePromoCamera, fakeReviewList, getFakeCamera, getFakeCamerasReview } from '../../mock/mock';
import App from './app';
import { generatePath } from 'react-router-dom';
import { renderFakeApp } from '../../mock/fake-app/fake-app';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { createAPI } from '../../services/api';
import 'react-intersection-observer/test-utils';

const fakeCamera = getFakeCamera();


const mockState = {
  CAMERAS: {
    cameras: [getFakeCamera(), getFakeCamera()],
    isCamerasListLoading: LoadingStatus.Fulfilled,
    promoCamera: fakePromoCamera,
    isPromoCameraLoading: LoadingStatus.Fulfilled,
    selectedcamera: fakeCamera,
    isSelectedCameraLoading: LoadingStatus.Fulfilled,
    similarCameras: fakeCamerasList,
    isSimilarCamerasLoading: LoadingStatus.Fulfilled,
    reviewsList: fakeReviewList,
    isReviewsListLoading: LoadingStatus.Fulfilled

  },
  CATALOG: {
    currentPage: 1
  },
  REVIEW: {
    reviewSentStatus: false,
    reviewSentErrorStatus: false,
  }
};

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);

const store = mockStore({
  CAMERAS: {
    selectedcamera: getFakeCamera(),
    similarCameras: [getFakeCamera(), getFakeCamera()],
    reviewsList: [getFakeCamerasReview(), getFakeCamerasReview()]
  },
  CATALOG: {
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

  it('should render "CatalogPage" when user navigate to "/catalog"', async () => {
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

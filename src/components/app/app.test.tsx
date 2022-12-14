import { screen } from '@testing-library/react';
import { AppRoute, LoadingStatus, NameSpace, SortOrderParameter, SortTypeParameter } from '../../consts/const';
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
const fakeAddedOnBasketCamera = {
  camera: getFakeCamera(),
  camerasCount: 2
};


const mockState = {
  [NameSpace.Cameras]: {
    cameras: fakeCameraList,
    camerasListLoadingStatus: LoadingStatus.Fulfilled,
    camerasCount: 15,
    minCameraPrice: 0,
    maxCameraPrice: 10000
  },
  [NameSpace.SelectedCamera]: {
    selectedCamera: fakeCamera,
    selectedCameraLoadingStatus: LoadingStatus.Fulfilled,
  },
  [NameSpace.SimilarCameras]: {
    similarCameras: fakesimilarCameras,
    similarCamerasLoadingStatus: LoadingStatus.Fulfilled,
  },
  [NameSpace.Promo]: {
    promoCamera: fakePromoCamera,
    promoCameraLoadingStatus: LoadingStatus.Fulfilled
  },
  [NameSpace.Reviews]: {
    reviewsList: fakeReviewList,
    reviewsListLoadingStatus: LoadingStatus.Fulfilled,
  },
  [NameSpace.SendedReview]: {
    reviewSentStatus: LoadingStatus.Initial,
  },
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
  [NameSpace.Product]: {
    reviewModalOpenedStatus: false
  },
  [NameSpace.SearchedCameras]: {
    searchedCameras: [],
    searchedCamerasListLoadingStatus: LoadingStatus.Fulfilled
  },
  [NameSpace.Basket]: {
    addedItems: [fakeAddedOnBasketCamera],
    numberOfItemsAdded: 0,
    removedCamera: null
  },
  [NameSpace.AddItemModal]: {
    addItemModal: false,
    addedCamera: null
  },
  [NameSpace.Coupon]: {
    discountPercentage: 0,
    couponStatus: LoadingStatus.Initial,
    couponName: null
  },
  [NameSpace.Order]: {
    orderSentStatus: LoadingStatus.Initial
  }
};

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);

const store = mockStore({
  [NameSpace.SimilarCameras]: {
    similarCameras: [getFakeCamera()],
  },
  [NameSpace.SelectedCamera]: {
    selectedCamera: getFakeCamera(),
  },
  [NameSpace.Reviews]: {
    reviewsList: [getFakeCamerasReview()],
  },
  [NameSpace.SendedReview]: {
    reviewSentStatus: LoadingStatus.Initial,
  },
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
  [NameSpace.Product]: {
    reviewModalOpenedStatus: false
  },
  [NameSpace.SearchedCameras]: {
    searchedCameras: [],
    searchedCamerasListLoadingStatus: LoadingStatus.Fulfilled
  },
  [NameSpace.Basket]: {
    addedItems: [fakeAddedOnBasketCamera],
    numberOfItemsAdded: 0,
    removedCamera: null
  },
  [NameSpace.AddItemModal]: {
    addItemModal: false,
    addedCamera: null
  },
  [NameSpace.Coupon]: {
    discountPercentage: 0,
    couponStatus: LoadingStatus.Initial,
    couponName: null
  },
  [NameSpace.Order]: {
    orderSentStatus: LoadingStatus.Initial
  }
});


describe('Application Routing', () => {
  it('should render "MainPage" when user navigate to "/"', () => {
    renderFakeApp(<App />, {
      initialRoute: AppRoute.Main,
      initialState: mockState
    });

    expect(screen.getByText(/?????????????? ????????- ?? ????????????????????????/i)).toBeInTheDocument();
  });

  it('should render "CatalogPage" when user navigate to "/catalog"', () => {
    renderFakeApp(<App />, {
      initialRoute: generatePath(AppRoute.Catalog, {id: 'page_1'}),
      initialState: mockState
    });

    expect(screen.getByText(/?????????????? ????????- ?? ????????????????????????/i)).toBeInTheDocument();
  });
  it('should render "NotFoundPage" when user navigate to non-existent route', () => {
    renderFakeApp(<App />, {
      initialRoute: '/wrong-route',
      initialState: mockState
    });

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText(/??????????????/i)).toBeInTheDocument();
  });
  it('should render "ProductPage" when user navigate to "/product/:id"', async () => {

    renderFakeApp(<App />, {
      initialRoute: generatePath(AppRoute.Product, {id: String(fakeCamera.id)}),
      mockStore: store
    });

    expect(screen.getByText(/?????????????? ????????????/i)).toBeInTheDocument();
  });
});

import { configureMockStore } from '@jedmao/redux-mock-store';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { generatePath } from 'react-router-dom';
import thunk from 'redux-thunk';
import { AppRoute, LoadingStatus, NameSpace } from '../../consts/const';
import { renderFakeApp } from '../../mock/fake-app/fake-app';
import { getFakeCamera, getFakePromoCamera } from '../../mock/mock';
import { createAPI } from '../../services/api';
import { Pagination } from './pagination';
import 'react-intersection-observer/test-utils';

const fakeCameraList = [getFakeCamera(), getFakeCamera()];
const fakePromoCamera = getFakePromoCamera();


const firstPagemockState = {
  [NameSpace.Cameras]: {
    cameras: fakeCameraList,
    isCamerasListLoading: LoadingStatus.Fulfilled,
    camerasCount: 20
  },
  [NameSpace.Promo]: {
    promoCamera: fakePromoCamera,
    isPromoCameraLoading: LoadingStatus.Fulfilled
  },
  [NameSpace.Catalog]: {
    currentPage: 1,
  }

};

const lastPagemockState = {
  [NameSpace.Cameras]: {
    cameras: fakeCameraList,
    isCamerasListLoading: LoadingStatus.Fulfilled,
  },
  [NameSpace.Promo]: {
    promoCamera: fakePromoCamera,
    isPromoCameraLoading: LoadingStatus.Fulfilled
  },
  [NameSpace.Catalog]: {
    currentPage: 5,
  }

};

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);

const store = mockStore({
  [NameSpace.Cameras]: {
    cameras: [getFakeCamera()],
    camerasCount: 20
  },
  [NameSpace.Promo]: {
    promoCamera: getFakePromoCamera(),
  },
  [NameSpace.Catalog]: {
    currentPage: 1
  }
});

const storeLastPage = mockStore({
  [NameSpace.Cameras]: {
    cameras: [getFakeCamera()],
    camerasCount: 20
  },
  [NameSpace.Promo]: {
    promoCamera: getFakePromoCamera(),
  },
  [NameSpace.Catalog]: {
    currentPage: 3
  }
});

describe('Pagination component', () => {
  it('should render "Pagination component"', () => {
    renderFakeApp(<Pagination />, {
      initialState: firstPagemockState
    });

    expect(screen.getByTestId('pagination-component')).toBeInTheDocument();
  });
  it('should not render "back button" if user on first page', () => {
    renderFakeApp(<Pagination />, {
      initialRoute: generatePath(AppRoute.Catalog, {id: 'page_1'}),
      mockStore: store
    });

    expect(screen.queryByTestId('back-button')).not.toBeInTheDocument();
  });

  it('should click next button', async () => {
    renderFakeApp(<Pagination />, {
      initialRoute: generatePath(AppRoute.Catalog, {id: 'page_1'}),
      mockStore: store
    });
    await userEvent.click(screen.getByText('Далее'));

  });

  it('should click back button', async () => {
    renderFakeApp(<Pagination />, {
      initialRoute: generatePath(AppRoute.Catalog, {id: 'page_1'}),
      initialState: lastPagemockState
    });
    await userEvent.click(screen.getByText('Назад'));

  });

  it('should not render "next button" if user on last page', async () => {
    renderFakeApp(<Pagination />, {
      initialRoute: generatePath(AppRoute.Catalog, {id: 'page_3'}),
      mockStore: storeLastPage
    });

    await userEvent.click(screen.getByText(3));

    expect(screen.queryByTestId('next-button')).not.toBeInTheDocument();
  });

  it('should user click on link', async () => {
    renderFakeApp(<Pagination />, {
      initialRoute: generatePath(AppRoute.Catalog, {id: 'page_1'}),
      mockStore: store
    });

    await userEvent.click(screen.getByText(2));
    const [action] = store.getActions();
    expect(action.type).toBe('Catalog/changePage');
  });
});

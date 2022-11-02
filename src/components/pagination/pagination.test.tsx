import { configureMockStore } from '@jedmao/redux-mock-store';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { generatePath } from 'react-router-dom';
import thunk from 'redux-thunk';
import { AppRoute, LoadingStatus, NameSpace } from '../../consts/const';
import { renderFakeApp } from '../../mock/fake-app/fake-app';
import { getFakeCamera, getFakePromoCamera } from '../../mock/mock';
import { createAPI } from '../../services/api';
import { PaginationComponent } from './pagination';
import 'react-intersection-observer/test-utils';

const fakeCameraList = [getFakeCamera(), getFakeCamera()];
const fakePromoCamera = getFakePromoCamera();


const firstPagemockState = {
  [NameSpace.CatalogData]: {
    cameras: fakeCameraList,
    isCamerasListLoading: LoadingStatus.Fulfilled,
    promoCamera: fakePromoCamera,
    isPromoCameraLoading: LoadingStatus.Fulfilled
  },
  [NameSpace.CatalogProcess]: {
    currentPage: 1,
  }

};

const lastPagemockState = {
  [NameSpace.CatalogData]: {
    cameras: fakeCameraList,
    isCamerasListLoading: LoadingStatus.Fulfilled,
    promoCamera: fakePromoCamera,
    isPromoCameraLoading: LoadingStatus.Fulfilled
  },
  [NameSpace.CatalogProcess]: {
    currentPage: 5,
  }

};

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);

const store = mockStore({
  [NameSpace.CatalogData]: {
    cameras: [getFakeCamera()],
    promoCamera: getFakePromoCamera(),
  },
  [NameSpace.CatalogProcess]: {
    currentPage: 1
  }
});


describe('Pagination component', () => {
  it('should render "Pagination component"', () => {
    renderFakeApp(<PaginationComponent />, {
      initialState: firstPagemockState
    });

    expect(screen.getByTestId('pagination-component')).toBeInTheDocument();
  });
  it('should not render "back button" if user on first page', () => {
    renderFakeApp(<PaginationComponent />, {
      initialRoute: generatePath(AppRoute.Catalog, {id: 'page_1'}),
      initialState: firstPagemockState
    });

    expect(screen.queryByTestId('back-button')).not.toBeInTheDocument();
  });

  it('should click next button', async () => {
    renderFakeApp(<PaginationComponent />, {
      initialRoute: generatePath(AppRoute.Catalog, {id: 'page_1'}),
      mockStore: store
    });
    await userEvent.click(screen.getByText('Далее'));

  });

  it('should click back button', async () => {
    renderFakeApp(<PaginationComponent />, {
      initialRoute: generatePath(AppRoute.Catalog, {id: 'page_1'}),
      initialState: lastPagemockState
    });
    await userEvent.click(screen.getByText('Назад'));

  });

  it('should not render "next button" if user on last page', () => {
    renderFakeApp(<PaginationComponent />, {
      initialRoute: generatePath(AppRoute.Catalog, {id: 'page_5'}),
      initialState: lastPagemockState
    });

    expect(screen.queryByTestId('next-button')).not.toBeInTheDocument();
  });

  it('should user click on link', async () => {
    renderFakeApp(<PaginationComponent />, {
      initialRoute: generatePath(AppRoute.Catalog, {id: 'page_1'}),
      mockStore: store
    });

    await userEvent.click(screen.getByText(2));

  });
});

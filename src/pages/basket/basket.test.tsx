import { configureMockStore } from '@jedmao/redux-mock-store';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import thunk from 'redux-thunk';
import { LoadingStatus, NameSpace } from '../../consts/const';
import { renderFakeApp } from '../../mock/fake-app/fake-app';
import { getFakeCamera } from '../../mock/mock';

import { createAPI } from '../../services/api';
import { BasketPage } from './basket';

const fakeOrderCamerasListCamera = {
  camerasIds: [1, 2, 3, 4],
  coupon: 'coupon-333'
};

const fakeCamera = getFakeCamera();

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);


const store = mockStore({
  [NameSpace.SearchedCameras]: {
    searchedCameras: [],
  },
  [NameSpace.Basket]: {
    addedItems: [{camera: fakeCamera, camerasCount: 2}]
  },
  [NameSpace.AddItemModal]: {
    addItemModalOpenedStatus: false
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

const storeWitchCameras = mockStore({
  [NameSpace.SearchedCameras]: {
    searchedCameras: [],
  },
  [NameSpace.Basket]: {
    addedItems: []
  },
  [NameSpace.AddItemModal]: {
    addItemModalOpenedStatus: false
  },
  [NameSpace.Coupon]: {
    discountPercentage: 0,
    couponStatus: LoadingStatus.Initial,
    couponName: null
  },
  [NameSpace.Order]: {
    orderSentStatus: LoadingStatus.Fulfilled
  }
});


describe('Basket page', () => {
  it('should render "Basket page"', () => {
    renderFakeApp(<BasketPage />, {});

    expect(screen.getByTestId('basket')).toBeInTheDocument();
  });

  it('should tap esc button on Basket page"', async () => {
    renderFakeApp(<BasketPage/>, {
      mockStore: store
    });
    await userEvent.keyboard('{Escape}');

  });

  it('should dispatched orderSentStatus', async () => {
    renderFakeApp(<BasketPage/>, {
      mockStore: storeWitchCameras
    });

    await userEvent.click(screen.getByText('Оформить заказ'));

  });
});

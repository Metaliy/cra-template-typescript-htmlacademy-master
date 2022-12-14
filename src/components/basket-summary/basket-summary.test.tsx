import { LoadingStatus, NameSpace } from '../../consts/const';
import { renderFakeApp } from '../../mock/fake-app/fake-app';
import { getFakeCamera } from '../../mock/mock';
import { screen } from '@testing-library/react';
import { BasketSummary } from './basket-summary';
import userEvent from '@testing-library/user-event';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { createAPI } from '../../services/api';

const fakeCamera = getFakeCamera();

const fakeAddedCameraList = [{camera: fakeCamera, camerasCount: 1}];

const fakeOnSetOrderSuccessModalStatus = jest.fn;

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);

const store = mockStore({
  [NameSpace.Cameras]: {
    selectedCamera: getFakeCamera().id
  },
  [NameSpace.Product]: {
    reviewModalOpenedStatus: true
  },
});

describe('BasketSummary component', () => {
  it('should click  on submit button witch coupon BasketSummary', async () => {
    renderFakeApp(<BasketSummary addedCameras={fakeAddedCameraList} discountPercentage={15} couponStatus={LoadingStatus.Fulfilled} couponName={'camera-333'} orderSuccessModalStatus={fakeOnSetOrderSuccessModalStatus} />, {
      mockStore: store
    });

    await userEvent.type(screen.getByPlaceholderText(/Введите промокод/i), 'camera-333');

    await userEvent.click(screen.getByText('Оформить заказ'));

    const [action] = store.getActions();

    // eslint-disable-next-line no-console
    console.log(action);

    expect(action.type).toBe('data/postCameraOrderAction/pending');
  });
});

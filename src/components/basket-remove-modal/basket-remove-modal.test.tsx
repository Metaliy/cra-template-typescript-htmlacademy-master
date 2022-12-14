import { LoadingStatus, NameSpace } from '../../consts/const';
import { renderFakeApp } from '../../mock/fake-app/fake-app';
import 'react-intersection-observer/test-utils';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { BasketRemoveModal } from './basket-remove-modal';
import { getFakeCamera } from '../../mock/mock';

const fakeCamera = getFakeCamera();

const mockState = {
  [NameSpace.Cameras]: {
    camerasListLoadingStatus: LoadingStatus.Fulfilled,
    camerasCount: 20
  },
  [NameSpace.Promo]: {
    promoCameraLoadingStatus: LoadingStatus.Fulfilled
  },
  [NameSpace.Catalog]: {
    currentPage: 1,
  }
};

const fakeOrderSuccessModalStatus = jest.fn();

describe('Order succes modal component', () => {
  it('should render "Order succes modal component"', () => {
    renderFakeApp(<BasketRemoveModal camera={fakeCamera} setRemoveCameraModalOpenStatusHandler={fakeOrderSuccessModalStatus}/>, {
      initialState: mockState
    });
  });

  it('should click on overlay', async () => {
    renderFakeApp(<BasketRemoveModal camera={fakeCamera} setRemoveCameraModalOpenStatusHandler={fakeOrderSuccessModalStatus}/>, {
      initialState: mockState
    });

    await userEvent.click(screen.getByTestId('overaly'));

    expect(fakeOrderSuccessModalStatus).toBeCalledTimes(1);

  });

  it('should click on confirm-button', async () => {
    renderFakeApp(<BasketRemoveModal camera={fakeCamera} setRemoveCameraModalOpenStatusHandler={fakeOrderSuccessModalStatus}/>, {
      initialState: mockState
    });

    await userEvent.click(screen.getByTestId('confirm-button'));

  });

  it('should click on continue-button', async () => {
    renderFakeApp(<BasketRemoveModal camera={fakeCamera} setRemoveCameraModalOpenStatusHandler={fakeOrderSuccessModalStatus}/>, {
      initialState: mockState
    });

    await userEvent.click(screen.getByTestId('continue-button'));

  });

  it('should click on cross-button', async () => {
    renderFakeApp(<BasketRemoveModal camera={fakeCamera} setRemoveCameraModalOpenStatusHandler={fakeOrderSuccessModalStatus}/>, {
      initialState: mockState
    });

    await userEvent.click(screen.getByTestId('cross-button'));

  });

});


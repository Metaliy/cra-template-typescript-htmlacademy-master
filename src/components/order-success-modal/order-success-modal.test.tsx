import { LoadingStatus, NameSpace } from '../../consts/const';
import { renderFakeApp } from '../../mock/fake-app/fake-app';
import { OrderSuccessModal } from './order-success-modal';
import 'react-intersection-observer/test-utils';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';

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
    renderFakeApp(<OrderSuccessModal orderSuccessModalStatus={fakeOrderSuccessModalStatus}/>, {
      initialState: mockState
    });
  });

  it('should click on overlay', async () => {
    renderFakeApp(<OrderSuccessModal orderSuccessModalStatus={fakeOrderSuccessModalStatus}/>, {
      initialState: mockState
    });

    await userEvent.click(screen.getByTestId('overaly'));

    expect(fakeOrderSuccessModalStatus).toBeCalledTimes(1);

  });

  it('should click on back-to-catalog-button', async () => {
    renderFakeApp(<OrderSuccessModal orderSuccessModalStatus={fakeOrderSuccessModalStatus}/>, {
      initialState: mockState
    });

    await userEvent.click(screen.getByTestId('back-to-catalog-button'));

  });

  it('should click on cross-button', async () => {
    renderFakeApp(<OrderSuccessModal orderSuccessModalStatus={fakeOrderSuccessModalStatus}/>, {
      initialState: mockState
    });

    await userEvent.click(screen.getByTestId('cross-button'));

  });

});


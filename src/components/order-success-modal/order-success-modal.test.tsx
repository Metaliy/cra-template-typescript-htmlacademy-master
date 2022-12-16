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

const fakeCloseButtonClick = jest.fn();
const fakeSubmitButtonClick = jest.fn();

describe('OrderSuccessModal component', () => {
  it('should render OrderSuccessModal', () => {
    renderFakeApp(<OrderSuccessModal onCloseClick={fakeCloseButtonClick} onBackButtonClick={fakeSubmitButtonClick}/>, {
      initialState: mockState
    });
  });

  it('should OrderSuccessModal click on overlay', async () => {
    renderFakeApp(<OrderSuccessModal onCloseClick={fakeCloseButtonClick} onBackButtonClick={fakeSubmitButtonClick}/>, {
      initialState: mockState
    });

    await userEvent.click(screen.getByTestId('overaly'));

    expect(fakeCloseButtonClick).toBeCalledTimes(1);

  });

  it('should click on back-to-catalog-button', async () => {
    renderFakeApp(<OrderSuccessModal onCloseClick={fakeCloseButtonClick} onBackButtonClick={fakeSubmitButtonClick}/>, {
      initialState: mockState
    });

    await userEvent.click(screen.getByTestId('back-to-catalog-button'));

  });

  it('should OrderSuccessModal click on cross-button', async () => {
    renderFakeApp(<OrderSuccessModal onCloseClick={fakeCloseButtonClick} onBackButtonClick={fakeSubmitButtonClick}/>, {
      initialState: mockState
    });

    await userEvent.click(screen.getByTestId('cross-button'));

  });

});


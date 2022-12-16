import { configureMockStore } from '@jedmao/redux-mock-store';
import userEvent from '@testing-library/user-event';
import thunk from 'redux-thunk';
import { NameSpace, LoadingStatus } from '../../../consts/const';
import { renderFakeApp } from '../../../mock/fake-app/fake-app';
import { fakeReviewList, getFakeCamerasReview } from '../../../mock/mock';
import { createAPI } from '../../../services/api';
import { screen } from '@testing-library/react';
import { AddItemSuccessModal } from './add-item-success-popup';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  [NameSpace.Reviews]: {
    reviewSentStatus: LoadingStatus.Initial,
    reviewsList: fakeReviewList,
    reviewsListLoadingStatus: LoadingStatus.Initial,
  },
  [NameSpace.Cameras]: {
    selectedCamera: getFakeCamerasReview().id
  },
  [NameSpace.Product]: {
    reviewModalOpenedStatus: false
  },
});

const fakefn = jest.fn();


describe('AddItemSuccessModal component', () => {
  it('should render AddItemSuccessModal', () => {
    renderFakeApp(<AddItemSuccessModal onCloseClick={fakefn} />, {
      mockStore: store
    });
  });

  it('should AddItemSuccessModal click on overlay', async () => {
    renderFakeApp(<AddItemSuccessModal onCloseClick={fakefn}/>, {
      mockStore: store
    });

    await userEvent.click(screen.getByTestId('overaly'));

  });

  it('should click on back-to-catalog-button', async () => {
    renderFakeApp(<AddItemSuccessModal onCloseClick={fakefn}/>, {
      mockStore: store
    });

    await userEvent.click(screen.getByTestId('back-to-catalog-button'));

  });

  it('should click on go-to-basket-button', async () => {
    renderFakeApp(<AddItemSuccessModal onCloseClick={fakefn} />, {
      mockStore: store
    });

    await userEvent.click(screen.getByTestId('go-to-basket-button'));

  });

  it('should AddItemSuccessModal click on cross-button', async () => {
    renderFakeApp(<AddItemSuccessModal onCloseClick={fakefn} />, {
      mockStore: store
    });

    await userEvent.click(screen.getByTestId('cross-button'));

  });

});

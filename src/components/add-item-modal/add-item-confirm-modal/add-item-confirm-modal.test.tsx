import { configureMockStore } from '@jedmao/redux-mock-store';
import userEvent from '@testing-library/user-event';
import thunk from 'redux-thunk';
import { NameSpace, LoadingStatus } from '../../../consts/const';
import { renderFakeApp } from '../../../mock/fake-app/fake-app';
import { getFakeCamera, fakeReviewList, getFakeCamerasReview } from '../../../mock/mock';
import { createAPI } from '../../../services/api';
import { AddItemConfirmModal } from './add-item-confirm-modal';
import { screen } from '@testing-library/react';

const fakeCamera = getFakeCamera();


const fakeOrderSuccessModalStatus = jest.fn();

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


describe('AddItemConfirmModal component', () => {
  it('should render AddItemConfirmModal', () => {
    renderFakeApp(<AddItemConfirmModal camera={fakeCamera} onSubmitButtonClick={fakeOrderSuccessModalStatus} onCloseClick={fakeOrderSuccessModalStatus} />, {
      mockStore: store
    });
  });

  it('should AddItemConfirmModal click on overlay', async () => {
    renderFakeApp(<AddItemConfirmModal camera={fakeCamera} onSubmitButtonClick={fakeOrderSuccessModalStatus} onCloseClick={fakeOrderSuccessModalStatus}/>, {
      mockStore: store
    });

    await userEvent.click(screen.getByTestId('overaly'));

  });

  it('should click on add-on-basket-button', async () => {
    renderFakeApp(<AddItemConfirmModal camera={fakeCamera} onSubmitButtonClick={fakeOrderSuccessModalStatus} onCloseClick={fakeOrderSuccessModalStatus}/>, {
      mockStore: store
    });

    await userEvent.click(screen.getByTestId('add-on-basket-button'));


  });

  it('should AddItemConfirmModal click on cross-button', async () => {
    renderFakeApp(<AddItemConfirmModal camera={fakeCamera} onSubmitButtonClick={fakeOrderSuccessModalStatus} onCloseClick={fakeOrderSuccessModalStatus}/>, {
      mockStore: store
    });

    await userEvent.click(screen.getByTestId('cross-button'));

  });

});

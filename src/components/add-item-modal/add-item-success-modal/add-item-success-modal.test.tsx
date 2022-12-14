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


describe('AddItemSuccessModal component', () => {
  it('should render AddItemSuccessModal', () => {
    renderFakeApp(<AddItemSuccessModal />, {
      mockStore: store
    });
  });

  it('should click on overlay', async () => {
    renderFakeApp(<AddItemSuccessModal isCatalog/>, {
      mockStore: store
    });

    await userEvent.click(screen.getByTestId('overaly'));

    const [action] = store.getActions();
    expect(action.type).toBe('AddItemModal/addItemModalOpenedStatus');

  });

  it('should click on back-to-catalog-button', async () => {
    renderFakeApp(<AddItemSuccessModal/>, {
      mockStore: store
    });

    await userEvent.click(screen.getByTestId('back-to-catalog-button'));

  });

  it('should click on go-to-basket-button', async () => {
    renderFakeApp(<AddItemSuccessModal />, {
      mockStore: store
    });

    await userEvent.click(screen.getByTestId('go-to-basket-button'));

  });

  it('should click on cross-button', async () => {
    renderFakeApp(<AddItemSuccessModal />, {
      mockStore: store
    });

    await userEvent.click(screen.getByTestId('cross-button'));

    const [action] = store.getActions();
    expect(action.type).toBe('AddItemModal/addItemModalOpenedStatus');

  });

});

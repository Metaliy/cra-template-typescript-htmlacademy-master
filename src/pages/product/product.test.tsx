import { configureMockStore } from '@jedmao/redux-mock-store';
import { screen } from '@testing-library/react';
import thunk from 'redux-thunk';
import { LoadingStatus, NameSpace } from '../../consts/const';
import { renderFakeApp } from '../../mock/fake-app/fake-app';
import { createAPI } from '../../services/api';
import { ProductPage } from './product';
import userEvent from '@testing-library/user-event';
import { fakeReviewList, getFakeCamera } from '../../mock/mock';

const fakeCamera = getFakeCamera();
const fakesimilarCameras = [getFakeCamera(), getFakeCamera()];
const fakeAddedOnBasketCamera = {
  camera: getFakeCamera(),
  camerasCount: 2
};


const mockState = {
  [NameSpace.Cameras]: {
    selectedCameraLoadingStatus: LoadingStatus.Pending,
  }

};

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);


const store = mockStore({
  [NameSpace.SearchedCameras]: {
    searchedCameras: [],
  },
  [NameSpace.AddItemModal]: {
    addItemModalOpenedStatus: false
  },
  [NameSpace.SelectedCamera]: {
    selectedCamera: fakeCamera,
    selectedCameraLoadingStatus: LoadingStatus.Fulfilled,
  },
  [NameSpace.SimilarCameras]: {
    similarCameras: fakesimilarCameras,
    similarCamerasLoadingStatus: LoadingStatus.Fulfilled,
  },
  [NameSpace.Reviews]: {
    reviewsList: fakeReviewList,
    reviewsListLoadingStatus: LoadingStatus.Fulfilled,
  },
  [NameSpace.SendedReview]: {
    reviewSentStatus: LoadingStatus.Initial,
  },
  [NameSpace.Basket]: {
    addedItems: [fakeAddedOnBasketCamera],
    numberOfItemsAdded: 0,
    removedCamera: null
  },
  [NameSpace.Product]: {
    reviewModalOpenedStatus: false
  }
});

describe('Product page component', () => {
  it('should render "Product page component"', () => {
    renderFakeApp(<ProductPage/>, {
      initialState: mockState
    });

    expect(screen.getByTestId('loader-component')).toBeInTheDocument();
  });

  it('should open addItemModal if click on add-item-modal-open-button"', async () => {
    renderFakeApp(<ProductPage/>, {
      mockStore: store
    });
    await userEvent.click(screen.getAllByTestId('add-item-modal-open-button')[0]);

  });

  it('should tap esc button on product page"', async () => {
    renderFakeApp(<ProductPage/>, {
      mockStore: store
    });
    await userEvent.keyboard('{Escape}');
  });
});

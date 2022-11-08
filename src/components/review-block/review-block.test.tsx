import { configureMockStore } from '@jedmao/redux-mock-store';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import thunk from 'redux-thunk';
import { LoadingStatus, NameSpace } from '../../consts/const';
import { renderFakeApp } from '../../mock/fake-app/fake-app';
import { getFakeCamerasReview } from '../../mock/mock';
import { createAPI } from '../../services/api';
import { ReviewBlock } from './review-block';


const fakeReviewList = [getFakeCamerasReview(), getFakeCamerasReview(), getFakeCamerasReview(), getFakeCamerasReview()];

const mockState = {
  [NameSpace.Reviews]: {
    reviewsList: fakeReviewList,
    reviewSentStatus: LoadingStatus.Initial,
    reviewsListLoadingStatus: LoadingStatus.Initial,
  },
  [NameSpace.Product]: {
    reviewModalOpenedStatus: false,
  },

};

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


describe('Review block component', () => {
  it('should render "Review block component"', () => {
    renderFakeApp(<ReviewBlock reviewsList={fakeReviewList}/>, {
      initialState:mockState
    });

    expect(screen.getByTestId('review-block')).toBeInTheDocument();
  });

  it('should click on modalStatusHandler', async () => {
    renderFakeApp(<ReviewBlock reviewsList={fakeReviewList}/>, {
      mockStore: store
    });

    await userEvent.click(screen.getByTestId('modal-open-button'));
    const [action] = store.getActions();
    expect(action.type).toBe('Product/reviewModalOpenedStatus');
  });

  it('should click on show-more-reviews-button', async () => {
    renderFakeApp(<ReviewBlock reviewsList={fakeReviewList}/>, {
      initialState:mockState
    });

    await userEvent.click(screen.getByTestId('show-more-reviews-button'));
    expect(screen.getByTestId(`review-card-${fakeReviewList[3].id}`)).toBeInTheDocument();
  });

});

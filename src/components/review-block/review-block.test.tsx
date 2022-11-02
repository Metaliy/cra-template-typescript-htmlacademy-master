import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NameSpace } from '../../consts/const';
import { renderFakeApp } from '../../mock/fake-app/fake-app';
import { getFakeCamerasReview } from '../../mock/mock';
import { ReviewBlockComponent } from './review-block';


const modalStatusHandler = jest.fn();

const fakeReviewList = [getFakeCamerasReview(), getFakeCamerasReview(), getFakeCamerasReview(), getFakeCamerasReview()];

const mockState = {
  [NameSpace.ProductData]: {
    reviewsList: fakeReviewList,
  }

};


describe('Review block component', () => {
  it('should render "Review block component"', () => {
    renderFakeApp(<ReviewBlockComponent modalStatusHandler={modalStatusHandler} isReviewModalOpenStatus={false}/>, {
      initialState:mockState
    });

    expect(screen.getByTestId('review-block')).toBeInTheDocument();
  });

  it('should click on modalStatusHandler', async () => {
    renderFakeApp(<ReviewBlockComponent modalStatusHandler={modalStatusHandler} isReviewModalOpenStatus={false}/>, {
      initialState:mockState
    });

    await userEvent.click(screen.getByTestId('modal-open-button'));
    expect(modalStatusHandler).toBeCalledTimes(1);
  });

  it('should click on show-more-reviews-button', async () => {
    renderFakeApp(<ReviewBlockComponent modalStatusHandler={modalStatusHandler} isReviewModalOpenStatus={false}/>, {
      initialState:mockState
    });

    await userEvent.click(screen.getByTestId('show-more-reviews-button'));
    expect(screen.getByTestId(`review-card-${fakeReviewList[3].id}`)).toBeInTheDocument();
  });

});

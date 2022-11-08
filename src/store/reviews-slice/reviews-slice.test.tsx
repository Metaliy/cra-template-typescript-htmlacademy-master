import { LoadingStatus } from '../../consts/const';
import { getFakeCamerasReview } from '../../mock/mock';
import { ReviewsSliceType } from '../../types/state-types';
import { fetchCamerasReviewsAction } from '../api-actions/product-api/product-api';
import { reviewsSlice } from './reviews-slice';


const fakeReviews = [getFakeCamerasReview(), getFakeCamerasReview(), getFakeCamerasReview()];

describe('Reducer test: productReviewsData', () => {
  let mockState: ReviewsSliceType;


  beforeEach(() => {
    mockState = {
      reviewsList: [],
      reviewsListLoadingStatus: LoadingStatus.Initial,
    };
  });

  it('return initial state', () => {
    expect(reviewsSlice.reducer(undefined, {type: 'undefiend-action'}))
      .toEqual(mockState);
  });

  describe('fetchCamerasReviewsAction test', () => {
    it('should update cameras with given mock data, update reviewsListLoadingStatus to fulfilled if fetchCamerasAction is fulfilled',
      () => {
        expect(reviewsSlice.reducer(mockState, {
          payload: fakeReviews,
          type: fetchCamerasReviewsAction.fulfilled.type
        }))
          .toEqual({
            ...mockState,
            reviewsList: fakeReviews,
            reviewsListLoadingStatus: LoadingStatus.Fulfilled,
          });
      });

    it('Update reviewsListLoadingStatus to pending if fetchCamerasAction is pending',
      () => {
        expect(reviewsSlice.reducer(mockState, {
          type: fetchCamerasReviewsAction.pending.type
        }))
          .toEqual({
            ...mockState,
            reviewsListLoadingStatus: LoadingStatus.Pending
          });
      });

    it('Update reviewsListLoadingStatus to rejected if fetchCamerasAction is rejected',
      () => {
        expect(reviewsSlice.reducer(mockState, {
          type: fetchCamerasReviewsAction.rejected.type
        }))
          .toEqual({
            ...mockState,
            reviewsListLoadingStatus: LoadingStatus.Rejected
          });
      });

  });


});

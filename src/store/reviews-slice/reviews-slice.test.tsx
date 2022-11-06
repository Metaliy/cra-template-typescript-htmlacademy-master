import { LoadingStatus } from '../../consts/const';
import { getFakeCamerasReview } from '../../mock/mock';
import { ReviewsSliceType } from '../../types/state-types';
import { fetchCamerasReviewsAction, postCameraReviewAction } from '../api-actions/product-api/product-api';
import { reviewsSlice } from './reviews-slice';


const fakeReviews = [getFakeCamerasReview(), getFakeCamerasReview(), getFakeCamerasReview()];

describe('Reducer test: productReviewsData', () => {
  let mockState: ReviewsSliceType;


  beforeEach(() => {
    mockState = {
      reviewsList: [],
      isReviewsListLoading: LoadingStatus.Initial,
      reviewSentStatus: LoadingStatus.Initial
    };
  });

  it('return initial state', () => {
    expect(reviewsSlice.reducer(undefined, {type: 'undefiend-action'}))
      .toEqual(mockState);
  });

  describe('fetchCamerasReviewsAction test', () => {
    it('should update cameras with given mock data, update isReviewsListLoading to fulfilled if fetchCamerasAction is fulfilled',
      () => {
        expect(reviewsSlice.reducer(mockState, {
          payload: fakeReviews,
          type: fetchCamerasReviewsAction.fulfilled.type
        }))
          .toEqual({
            ...mockState,
            reviewsList: fakeReviews,
            isReviewsListLoading: LoadingStatus.Fulfilled,
          });
      });

    it('Update isReviewsListLoading to pending if fetchCamerasAction is pending',
      () => {
        expect(reviewsSlice.reducer(mockState, {
          type: fetchCamerasReviewsAction.pending.type
        }))
          .toEqual({
            ...mockState,
            isReviewsListLoading: LoadingStatus.Pending
          });
      });

    it('Update isReviewsListLoading to rejected if fetchCamerasAction is rejected',
      () => {
        expect(reviewsSlice.reducer(mockState, {
          type: fetchCamerasReviewsAction.rejected.type
        }))
          .toEqual({
            ...mockState,
            isReviewsListLoading: LoadingStatus.Rejected
          });
      });

  });

  describe('postCameraReviewAction test', () => {
    it('should update cameras with given mock data, update isCamerasListLoading to fulfilled if postCameraReviewAction is fulfilled',
      () => {
        expect(reviewsSlice.reducer(mockState, {
          type: postCameraReviewAction.fulfilled.type
        }))
          .toEqual({
            ...mockState,
            reviewSentStatus: LoadingStatus.Fulfilled,
          });
      });

    it('Update isCamerasListLoading to pending if postCameraReviewAction is pending',
      () => {
        expect(reviewsSlice.reducer(mockState, {
          type: postCameraReviewAction.pending.type
        }))
          .toEqual({
            ...mockState,
            reviewSentStatus: LoadingStatus.Pending
          });
      });

    it('Update isCamerasListLoading to rejected if postCameraReviewAction is rejected',
      () => {
        expect(reviewsSlice.reducer(mockState, {
          type: postCameraReviewAction.rejected.type
        }))
          .toEqual({
            ...mockState,
            reviewSentStatus: LoadingStatus.Rejected
          });
      });

  });

});

import { LoadingStatus } from '../../../consts/const';
import { SendedReviewSliceType } from '../../../types/state-types';
import { postCameraReviewAction } from '../../api-actions/sended-review-api/sended-review-api';
import { sendedReviewSlice } from './sended-review-slice';


describe('Reducer test: productReviewsData', () => {
  let mockState: SendedReviewSliceType;


  beforeEach(() => {
    mockState = {
      reviewSentStatus: LoadingStatus.Initial
    };
  });

  it('return initial state', () => {
    expect(sendedReviewSlice.reducer(undefined, {type: 'undefiend-action'}))
      .toEqual(mockState);
  });

  describe('postCameraReviewAction test', () => {
    it('should update cameras with given mock data, update camerasListLoadingStatus to fulfilled if postCameraReviewAction is fulfilled',
      () => {
        expect(sendedReviewSlice.reducer(mockState, {
          type: postCameraReviewAction.fulfilled.type
        }))
          .toEqual({
            ...mockState,
            reviewSentStatus: LoadingStatus.Fulfilled,
          });
      });

    it('Update camerasListLoadingStatus to pending if postCameraReviewAction is pending',
      () => {
        expect(sendedReviewSlice.reducer(mockState, {
          type: postCameraReviewAction.pending.type
        }))
          .toEqual({
            ...mockState,
            reviewSentStatus: LoadingStatus.Pending
          });
      });

    it('Update camerasListLoadingStatus to rejected if postCameraReviewAction is rejected',
      () => {
        expect(sendedReviewSlice.reducer(mockState, {
          type: postCameraReviewAction.rejected.type
        }))
          .toEqual({
            ...mockState,
            reviewSentStatus: LoadingStatus.Rejected
          });
      });

  });

});

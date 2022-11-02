import { LoadingStatus } from '../../consts/const';
import { ProductProcessType } from '../../types/state-types';
import { postCameraReview } from '../api-actions/product-api/product-api';
import { productProcess } from './product-process';


describe('Reducer test: productProcess', () => {
  let mockState: ProductProcessType;


  beforeEach(() => {
    mockState = {
      reviewSentStatus: LoadingStatus.Initial,
    };
  });

  it('return initial state', () => {
    expect(productProcess.reducer(undefined, {type: 'undefiend-action'}))
      .toEqual(mockState);
  });

  describe('postCameraReview test', () => {
    it('should update cameras with given mock data, update isCamerasListLoading to fulfilled if postCameraReview is fulfilled',
      () => {
        expect(productProcess.reducer(mockState, {
          type: postCameraReview.fulfilled.type
        }))
          .toEqual({
            ...mockState,
            reviewSentStatus: LoadingStatus.Fulfilled,
          });
      });

    it('Update isCamerasListLoading to pending if postCameraReview is pending',
      () => {
        expect(productProcess.reducer(mockState, {
          type: postCameraReview.pending.type
        }))
          .toEqual({
            ...mockState,
            reviewSentStatus: LoadingStatus.Pending
          });
      });

    it('Update isCamerasListLoading to rejected if postCameraReview is rejected',
      () => {
        expect(productProcess.reducer(mockState, {
          type: postCameraReview.rejected.type
        }))
          .toEqual({
            ...mockState,
            reviewSentStatus: LoadingStatus.Rejected
          });
      });

  });

});


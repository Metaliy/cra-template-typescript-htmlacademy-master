import { LoadingStatus } from '../../consts/const';
import { getUidCamerasList } from '../../mock/mock';
import { similarCamerasSliceType } from '../../types/state-types';
import { fetchSimilarCamerasAction } from '../api-actions/product-api/product-api';
import { similarCamerasSlice } from './similar-cameras-slice';


const fakeSimilarCameras = getUidCamerasList(3);


describe('Reducer test: cameras-slice', () => {
  let mockState: similarCamerasSliceType;


  beforeEach(() => {
    mockState = {
      similarCameras: [],
      similarCamerasLoadingStatus: LoadingStatus.Initial,
    };
  });

  it('return initial state', () => {
    expect(similarCamerasSlice.reducer(undefined, {type: 'undefiend-action'}))
      .toEqual(mockState);
  });

  describe('fetchSimilarCamerasAction test', () => {
    it('should update cameras with given mock data, update similarCamerasLoadingStatus to fulfilled if fetchCamerasAction is fulfilled',
      () => {
        expect(similarCamerasSlice.reducer(mockState, {
          payload: fakeSimilarCameras,
          type: fetchSimilarCamerasAction.fulfilled.type
        }))
          .toEqual({
            ...mockState,
            similarCameras: fakeSimilarCameras,
            similarCamerasLoadingStatus: LoadingStatus.Fulfilled,
          });
      });

    it('Update similarCamerasLoadingStatus to pending if fetchCamerasAction is pending',
      () => {
        expect(similarCamerasSlice.reducer(mockState, {
          type: fetchSimilarCamerasAction.pending.type
        }))
          .toEqual({
            ...mockState,
            similarCamerasLoadingStatus: LoadingStatus.Pending
          });
      });

    it('Update similarCamerasLoadingStatus to rejected if fetchCamerasAction is rejected',
      () => {
        expect(similarCamerasSlice.reducer(mockState, {
          type: fetchSimilarCamerasAction.rejected.type
        }))
          .toEqual({
            ...mockState,
            similarCamerasLoadingStatus: LoadingStatus.Rejected
          });
      });

  });

});


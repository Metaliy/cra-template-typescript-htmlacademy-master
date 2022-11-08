import { LoadingStatus } from '../../consts/const';
import { getUidCamerasList } from '../../mock/mock';

import { CamerasSliceType } from '../../types/state-types';
import { fetchCamerasAction } from '../api-actions/catalog-api/catalog-api';
import { camerasSlice } from './cameras-slice';


const fakeCameras = getUidCamerasList(3);


const fakeCamerasCount = 15;

describe('Reducer test: cameras-slice', () => {
  let mockState: CamerasSliceType;


  beforeEach(() => {
    mockState = {
      cameras: [],
      camerasListLoadingStatus: LoadingStatus.Initial,
      camerasCount: 0
    };
  });

  it('return initial state', () => {
    expect(camerasSlice.reducer(undefined, {type: 'undefiend-action'}))
      .toEqual(mockState);
  });

  describe('fetchCamerasAction test', () => {
    it('should update cameras with given mock data, update camerasListLoadingStatus to fulfilled if fetchCamerasAction is fulfilled',
      () => {
        expect(camerasSlice.reducer(mockState, {
          payload: {
            responsedData: fakeCameras,
            responsedDataCount: fakeCamerasCount
          },
          type: fetchCamerasAction.fulfilled.type
        }))
          .toEqual({
            ...mockState,
            cameras: fakeCameras,
            camerasCount : fakeCamerasCount,
            camerasListLoadingStatus: LoadingStatus.Fulfilled,
          });
      });

    it('Update camerasListLoadingStatus to pending if fetchCamerasAction is pending',
      () => {
        expect(camerasSlice.reducer(mockState, {
          type: fetchCamerasAction.pending.type
        }))
          .toEqual({
            ...mockState,
            camerasListLoadingStatus: LoadingStatus.Pending
          });
      });

    it('Update camerasListLoadingStatus to rejected if fetchCamerasAction is rejected',
      () => {
        expect(camerasSlice.reducer(mockState, {
          type: fetchCamerasAction.rejected.type
        }))
          .toEqual({
            ...mockState,
            camerasListLoadingStatus: LoadingStatus.Rejected
          });
      });

  });

});


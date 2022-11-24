import { LoadingStatus } from '../../../consts/const';
import { getUidCamerasList } from '../../../mock/mock';
import { CamerasSliceType } from '../../../types/state-types';
import { fetchCamerasAction } from '../../api-actions/cameras-api/cameras-api';
import { fetchMinMaxPriceCamerasAction } from '../../api-actions/min-max-cameras-price-api/min-max-cameras-price-api';
import { camerasSlice } from './cameras-slice';


const fakeCameras = getUidCamerasList(3);


const fakeCamerasCount = 15;

describe('Reducer test: cameras-slice', () => {
  let mockState: CamerasSliceType;


  beforeEach(() => {
    mockState = {
      cameras: [],
      camerasListLoadingStatus: LoadingStatus.Initial,
      camerasCount: 0,
      minCameraPrice: 0,
      maxCameraPrice: 0
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
            camerasListLoadingStatus: LoadingStatus.Fulfilled
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

  describe('fetchMinMaxPriceCamerasAction test', () => {

    it('should update maxCameraPrice and minCameraPrice with given mock data, update min and max CameraPrice  to fulfilled if fetchMinMaxPriceCamerasAction is fulfilled',
      () => {
        expect(camerasSlice.reducer(mockState, {
          payload: {
            minPrice: '1000',
            maxPrice: '1000000'
          },
          type: fetchMinMaxPriceCamerasAction.fulfilled.type
        }))
          .toEqual({
            ...mockState,
            minCameraPrice: '1000',
            maxCameraPrice: '1000000'
          });
      });

  });

});


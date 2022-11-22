import { LoadingStatus } from '../../consts/const';
import { getUidCamerasList } from '../../mock/mock';
import { SearchedCamerasSliceType } from '../../types/state-types';
import { fetchCamerasAction } from '../api-actions/cameras-api/cameras-api';
import { fetchSearchedCamerasAction } from '../api-actions/searched-cameras-api/searched-cameras-api';
import { searchedCamerasSlice } from './searched-cameras-slice';


const fakeCameras = getUidCamerasList(3);


const fakeCamerasCount = 15;

describe('Reducer test: searched-cameras-slice', () => {
  let mockState: SearchedCamerasSliceType;


  beforeEach(() => {
    mockState = {
      searchedCameras: [],
      searchedCamerasListLoadingStatus: LoadingStatus.Initial,
    };
  });

  it('return initial state', () => {
    expect(searchedCamerasSlice.reducer(undefined, {type: 'undefiend-action'}))
      .toEqual(mockState);
  });

  describe('fetchCamerasAction test', () => {
    it('should update cameras with given mock data, update searchedCamerasListLoadingStatus to fulfilled if fetchSearchedCamerasAction is fulfilled',
      () => {
        expect(searchedCamerasSlice.reducer(mockState, {
          payload: {
            responsedData: fakeCameras,
            responsedDataCount: fakeCamerasCount
          },
          type: fetchSearchedCamerasAction.fulfilled.type
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
        expect(searchedCamerasSlice.reducer(mockState, {
          type: fetchCamerasAction.pending.type
        }))
          .toEqual({
            ...mockState,
            camerasListLoadingStatus: LoadingStatus.Pending
          });
      });

    it('Update camerasListLoadingStatus to rejected if fetchCamerasAction is rejected',
      () => {
        expect(searchedCamerasSlice.reducer(mockState, {
          type: fetchCamerasAction.rejected.type
        }))
          .toEqual({
            ...mockState,
            camerasListLoadingStatus: LoadingStatus.Rejected
          });
      });

  });

});


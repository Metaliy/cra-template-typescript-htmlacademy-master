import { LoadingStatus } from '../../../consts/const';
import { getUidCamerasList } from '../../../mock/mock';
import { SearchedCamerasSliceType } from '../../../types/state-types';
import { fetchSearchedCamerasAction } from '../../api-actions/searched-cameras-api/searched-cameras-api';
import { emptySearchedCameraList, searchedCamerasSlice } from './searched-cameras-slice';


const fakeCameras = getUidCamerasList(3);


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

  describe('fetchSearchedCamerasAction test', () => {
    it('should update cameras with given mock data, update searchedCamerasListLoadingStatus to fulfilled if fetchSearchedCamerasAction is fulfilled',
      () => {
        expect(searchedCamerasSlice.reducer(mockState, {
          payload: fakeCameras,
          type: fetchSearchedCamerasAction.fulfilled.type
        }))
          .toEqual({
            ...mockState,
            searchedCameras: fakeCameras,
            searchedCamerasListLoadingStatus: LoadingStatus.Fulfilled,
          });
      });

    it('Update searchedCamerasListLoadingStatus to pending if fetchSearchedCamerasAction is pending',
      () => {
        expect(searchedCamerasSlice.reducer(mockState, {
          type: fetchSearchedCamerasAction.pending.type
        }))
          .toEqual({
            ...mockState,
            searchedCamerasListLoadingStatus: LoadingStatus.Pending
          });
      });

    it('Update searchedCamerasListLoadingStatus to rejected if fetchSearchedCamerasAction is rejected',
      () => {
        expect(searchedCamerasSlice.reducer(mockState, {
          type: fetchSearchedCamerasAction.rejected.type
        }))
          .toEqual({
            ...mockState,
            searchedCamerasListLoadingStatus: LoadingStatus.Rejected
          });
      });

    it('Update clear searched cameras list  if dispatched emptySearchedCameraList',
      () => {
        expect(searchedCamerasSlice.reducer(mockState, emptySearchedCameraList()))
          .toEqual({
            ...mockState
          });
      });

  });

});


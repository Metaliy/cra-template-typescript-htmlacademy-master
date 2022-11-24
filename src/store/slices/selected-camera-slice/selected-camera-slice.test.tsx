
import { LoadingStatus } from '../../../consts/const';
import { getFakeCamera } from '../../../mock/mock';
import { CameraType } from '../../../types/server-data-types';
import { selectedCameraSliceType } from '../../../types/state-types';
import { fetchSelectedCameraAction } from '../../api-actions/selected-camera-api/selected-camera-api';
import { selectedCameraSlice } from './selected-camera-slice';


const fakeCamera = getFakeCamera();


describe('Reducer test: cameras-slice', () => {
  let mockState: selectedCameraSliceType;


  beforeEach(() => {
    mockState = {
      selectedCamera: {} as CameraType,
      selectedCameraLoadingStatus: LoadingStatus.Initial,
    };
  });

  it('return initial state', () => {
    expect(selectedCameraSlice.reducer(undefined, {type: 'undefiend-action'}))
      .toEqual(mockState);
  });

  describe('fetchSelectedCameraAction test', () => {
    it('should update cameras with given mock data, update selectedCameraLoadingStatus to fulfilled if fetchCamerasAction is fulfilled',
      () => {
        expect(selectedCameraSlice.reducer(mockState, {
          payload: fakeCamera,
          type: fetchSelectedCameraAction.fulfilled.type
        }))
          .toEqual({
            ...mockState,
            selectedCamera: fakeCamera,
            selectedCameraLoadingStatus: LoadingStatus.Fulfilled,
          });
      });

    it('Update selectedCameraLoadingStatus to pending if fetchCamerasAction is pending',
      () => {
        expect(selectedCameraSlice.reducer(mockState, {
          type: fetchSelectedCameraAction.pending.type
        }))
          .toEqual({
            ...mockState,
            selectedCameraLoadingStatus: LoadingStatus.Pending
          });
      });

    it('Update selectedCameraLoadingStatus to rejected if fetchCamerasAction is rejected',
      () => {
        expect(selectedCameraSlice.reducer(mockState, {
          type: fetchSelectedCameraAction.rejected.type
        }))
          .toEqual({
            ...mockState,
            selectedCameraLoadingStatus: LoadingStatus.Rejected
          });
      });

  });


});


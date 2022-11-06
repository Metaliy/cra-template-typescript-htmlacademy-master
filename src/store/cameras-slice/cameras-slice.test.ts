import { LoadingStatus } from '../../consts/const';
import { getFakeCamera, getUidCamerasList } from '../../mock/mock';
import { CameraType} from '../../types/server-data-types';
import { CamerasSliceType } from '../../types/state-types';
import { fetchCamerasAction } from '../api-actions/catalog-api/catalog-api';
import { fetchSelectedCameraAction, fetchSimilarCamerasAction } from '../api-actions/product-api/product-api';
import { camerasSlice } from './cameras-slice';


const fakeCameras = getUidCamerasList(3);
const fakeCamera = getFakeCamera();
const fakeSimilarCameras = getUidCamerasList(3);

const fakeCamerasCount = 15;

describe('Reducer test: cameras-slice', () => {
  let mockState: CamerasSliceType;


  beforeEach(() => {
    mockState = {
      cameras: [],
      camerasListLoadingStatus: LoadingStatus.Initial,
      selectedCamera: {} as CameraType,
      selectedCameraLoadingStatus: LoadingStatus.Initial,
      similarCameras: [],
      similarCamerasLoadingStatus: LoadingStatus.Initial,
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

  describe('fetchSelectedCameraAction test', () => {
    it('should update cameras with given mock data, update selectedCameraLoadingStatus to fulfilled if fetchCamerasAction is fulfilled',
      () => {
        expect(camerasSlice.reducer(mockState, {
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
        expect(camerasSlice.reducer(mockState, {
          type: fetchSelectedCameraAction.pending.type
        }))
          .toEqual({
            ...mockState,
            selectedCameraLoadingStatus: LoadingStatus.Pending
          });
      });

    it('Update selectedCameraLoadingStatus to rejected if fetchCamerasAction is rejected',
      () => {
        expect(camerasSlice.reducer(mockState, {
          type: fetchSelectedCameraAction.rejected.type
        }))
          .toEqual({
            ...mockState,
            selectedCameraLoadingStatus: LoadingStatus.Rejected
          });
      });

  });

  describe('fetchSimilarCamerasAction test', () => {
    it('should update cameras with given mock data, update similarCamerasLoadingStatus to fulfilled if fetchCamerasAction is fulfilled',
      () => {
        expect(camerasSlice.reducer(mockState, {
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
        expect(camerasSlice.reducer(mockState, {
          type: fetchSimilarCamerasAction.pending.type
        }))
          .toEqual({
            ...mockState,
            similarCamerasLoadingStatus: LoadingStatus.Pending
          });
      });

    it('Update similarCamerasLoadingStatus to rejected if fetchCamerasAction is rejected',
      () => {
        expect(camerasSlice.reducer(mockState, {
          type: fetchSimilarCamerasAction.rejected.type
        }))
          .toEqual({
            ...mockState,
            similarCamerasLoadingStatus: LoadingStatus.Rejected
          });
      });

  });

});


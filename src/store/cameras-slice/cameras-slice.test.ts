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
      isCamerasListLoading: LoadingStatus.Initial,
      selectedCamera: {} as CameraType,
      isSelectedCameraLoading: LoadingStatus.Initial,
      similarCameras: [],
      isSimilarCamerasLoading: LoadingStatus.Initial,
      camerasCount: 0
    };
  });

  it('return initial state', () => {
    expect(camerasSlice.reducer(undefined, {type: 'undefiend-action'}))
      .toEqual(mockState);
  });

  describe('fetchCamerasAction test', () => {
    it('should update cameras with given mock data, update isCamerasListLoading to fulfilled if fetchCamerasAction is fulfilled',
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
            isCamerasListLoading: LoadingStatus.Fulfilled,
          });
      });

    it('Update isCamerasListLoading to pending if fetchCamerasAction is pending',
      () => {
        expect(camerasSlice.reducer(mockState, {
          type: fetchCamerasAction.pending.type
        }))
          .toEqual({
            ...mockState,
            isCamerasListLoading: LoadingStatus.Pending
          });
      });

    it('Update isCamerasListLoading to rejected if fetchCamerasAction is rejected',
      () => {
        expect(camerasSlice.reducer(mockState, {
          type: fetchCamerasAction.rejected.type
        }))
          .toEqual({
            ...mockState,
            isCamerasListLoading: LoadingStatus.Rejected
          });
      });

  });

  describe('fetchSelectedCameraAction test', () => {
    it('should update cameras with given mock data, update isSelectedCameraLoading to fulfilled if fetchCamerasAction is fulfilled',
      () => {
        expect(camerasSlice.reducer(mockState, {
          payload: fakeCamera,
          type: fetchSelectedCameraAction.fulfilled.type
        }))
          .toEqual({
            ...mockState,
            selectedCamera: fakeCamera,
            isSelectedCameraLoading: LoadingStatus.Fulfilled,
          });
      });

    it('Update isSelectedCameraLoading to pending if fetchCamerasAction is pending',
      () => {
        expect(camerasSlice.reducer(mockState, {
          type: fetchSelectedCameraAction.pending.type
        }))
          .toEqual({
            ...mockState,
            isSelectedCameraLoading: LoadingStatus.Pending
          });
      });

    it('Update isSelectedCameraLoading to rejected if fetchCamerasAction is rejected',
      () => {
        expect(camerasSlice.reducer(mockState, {
          type: fetchSelectedCameraAction.rejected.type
        }))
          .toEqual({
            ...mockState,
            isSelectedCameraLoading: LoadingStatus.Rejected
          });
      });

  });

  describe('fetchSimilarCamerasAction test', () => {
    it('should update cameras with given mock data, update isSimilarCamerasLoading to fulfilled if fetchCamerasAction is fulfilled',
      () => {
        expect(camerasSlice.reducer(mockState, {
          payload: fakeSimilarCameras,
          type: fetchSimilarCamerasAction.fulfilled.type
        }))
          .toEqual({
            ...mockState,
            similarCameras: fakeSimilarCameras,
            isSimilarCamerasLoading: LoadingStatus.Fulfilled,
          });
      });

    it('Update isSimilarCamerasLoading to pending if fetchCamerasAction is pending',
      () => {
        expect(camerasSlice.reducer(mockState, {
          type: fetchSimilarCamerasAction.pending.type
        }))
          .toEqual({
            ...mockState,
            isSimilarCamerasLoading: LoadingStatus.Pending
          });
      });

    it('Update isSimilarCamerasLoading to rejected if fetchCamerasAction is rejected',
      () => {
        expect(camerasSlice.reducer(mockState, {
          type: fetchSimilarCamerasAction.rejected.type
        }))
          .toEqual({
            ...mockState,
            isSimilarCamerasLoading: LoadingStatus.Rejected
          });
      });

  });

});


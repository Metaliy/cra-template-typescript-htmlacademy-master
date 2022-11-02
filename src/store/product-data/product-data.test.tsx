import { LoadingStatus } from '../../consts/const';
import { getFakeCamera, getFakeCamerasReview, getUidCamerasList } from '../../mock/mock';
import { CameraType } from '../../types/server-data-types';
import { ProductDataType } from '../../types/state-types';
import { fetchSelectedCameraAction, fetchSimilarCamerasAction, fetchCamerasReviewsAction } from '../api-actions/product-api/product-api';
import { productData } from './product-data';

const fakeCamera = getFakeCamera();
const fakeSimilarCameras = getUidCamerasList(3);
const fakeReviews = [getFakeCamerasReview(), getFakeCamerasReview(), getFakeCamerasReview()];

describe('Reducer test: productData', () => {
  let mockState: ProductDataType;


  beforeEach(() => {
    mockState = {
      selectedCamera: {} as CameraType,
      isSelectedCameraLoading: LoadingStatus.Initial,
      similarCameras: [],
      isSimilarCamerasLoading: LoadingStatus.Initial,
      reviewsList: [],
      isReviewsListLoading: LoadingStatus.Initial
    };
  });

  it('return initial state', () => {
    expect(productData.reducer(undefined, {type: 'undefiend-action'}))
      .toEqual(mockState);
  });

  describe('fetchSelectedCameraAction test', () => {
    it('should update cameras with given mock data, update isSelectedCameraLoading to fulfilled if fetchCamerasAction is fulfilled',
      () => {
        expect(productData.reducer(mockState, {
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
        expect(productData.reducer(mockState, {
          type: fetchSelectedCameraAction.pending.type
        }))
          .toEqual({
            ...mockState,
            isSelectedCameraLoading: LoadingStatus.Pending
          });
      });

    it('Update isSelectedCameraLoading to rejected if fetchCamerasAction is rejected',
      () => {
        expect(productData.reducer(mockState, {
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
        expect(productData.reducer(mockState, {
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
        expect(productData.reducer(mockState, {
          type: fetchSimilarCamerasAction.pending.type
        }))
          .toEqual({
            ...mockState,
            isSimilarCamerasLoading: LoadingStatus.Pending
          });
      });

    it('Update isSimilarCamerasLoading to rejected if fetchCamerasAction is rejected',
      () => {
        expect(productData.reducer(mockState, {
          type: fetchSimilarCamerasAction.rejected.type
        }))
          .toEqual({
            ...mockState,
            isSimilarCamerasLoading: LoadingStatus.Rejected
          });
      });

  });

  describe('fetchCamerasReviewsAction test', () => {
    it('should update cameras with given mock data, update isReviewsListLoading to fulfilled if fetchCamerasAction is fulfilled',
      () => {
        expect(productData.reducer(mockState, {
          payload: fakeReviews,
          type: fetchCamerasReviewsAction.fulfilled.type
        }))
          .toEqual({
            ...mockState,
            reviewsList: fakeReviews,
            isReviewsListLoading: LoadingStatus.Fulfilled,
          });
      });

    it('Update isReviewsListLoading to pending if fetchCamerasAction is pending',
      () => {
        expect(productData.reducer(mockState, {
          type: fetchCamerasReviewsAction.pending.type
        }))
          .toEqual({
            ...mockState,
            isReviewsListLoading: LoadingStatus.Pending
          });
      });

    it('Update isReviewsListLoading to rejected if fetchCamerasAction is rejected',
      () => {
        expect(productData.reducer(mockState, {
          type: fetchCamerasReviewsAction.rejected.type
        }))
          .toEqual({
            ...mockState,
            isReviewsListLoading: LoadingStatus.Rejected
          });
      });

  });

});

import { createSlice } from '@reduxjs/toolkit';
import { LoadingStatus, NameSpace } from '../../consts/const';
import { PromoCameraType, CameraType } from '../../types/server-data-types';
import { CameraDataType } from '../../types/state-types';
import { fetchSelectedCameraAction, fetchCamerasAction, fetchPromoCameraAction, fetchSimilarCamerasAction, fetchCamerasReviewsAction } from '../api-actions';


export const initialState: CameraDataType = {
  cameras: [],
  isCamerasListLoading: LoadingStatus.Initial,
  promoCamera: {} as PromoCameraType,
  isPromoCameraLoading: LoadingStatus.Initial,
  selectedCamera: {} as CameraType,
  isSelectedCameraLoading: LoadingStatus.Initial,
  similarCameras: [],
  isSimilarCamerasLoading: LoadingStatus.Initial,
  reviewsList: [],
  isReviewsListLoading: LoadingStatus.Initial
};

export const camerasData = createSlice({
  name: NameSpace.Cameras,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCamerasAction.pending, (state) => {
        state.isCamerasListLoading = LoadingStatus.Pending;
      })
      .addCase(fetchCamerasAction.fulfilled, (state, action) => {
        state.isCamerasListLoading = LoadingStatus.Fulfilled;
        state.cameras = action.payload;
      })
      .addCase(fetchCamerasAction.rejected, (state) => {
        state.isCamerasListLoading = LoadingStatus.Rejected;
      })
      .addCase(fetchPromoCameraAction.pending, (state) => {
        state.isPromoCameraLoading = LoadingStatus.Pending;
      })
      .addCase(fetchPromoCameraAction.fulfilled, (state, action) => {
        state.isPromoCameraLoading = LoadingStatus.Fulfilled;
        state.promoCamera = action.payload;
      })
      .addCase(fetchPromoCameraAction.rejected, (state) => {
        state.isPromoCameraLoading = LoadingStatus.Rejected;
      })
      .addCase(fetchSelectedCameraAction.pending, (state) => {
        state.isSelectedCameraLoading = LoadingStatus.Pending;
      })
      .addCase(fetchSelectedCameraAction.fulfilled, (state, action) => {
        state.selectedCamera = action.payload;
        state.isSelectedCameraLoading = LoadingStatus.Fulfilled;
      })
      .addCase(fetchSelectedCameraAction.rejected, (state) => {
        state.isSelectedCameraLoading = LoadingStatus.Rejected;
      })
      .addCase(fetchSimilarCamerasAction.pending, (state) => {
        state.isSimilarCamerasLoading = LoadingStatus.Pending;
      })
      .addCase(fetchSimilarCamerasAction.fulfilled, (state, action) => {
        state.similarCameras = action.payload;
        state.isSimilarCamerasLoading = LoadingStatus.Fulfilled;
      })
      .addCase(fetchSimilarCamerasAction.rejected, (state) => {
        state.isSimilarCamerasLoading = LoadingStatus.Rejected;
      })
      .addCase(fetchCamerasReviewsAction.pending, (state) => {
        state.isReviewsListLoading = LoadingStatus.Pending;
      })
      .addCase(fetchCamerasReviewsAction.fulfilled, (state, action) => {
        state.isReviewsListLoading = LoadingStatus.Fulfilled;
        state.reviewsList = action.payload;
      })
      .addCase(fetchCamerasReviewsAction.rejected, (state) => {
        state.isReviewsListLoading = LoadingStatus.Rejected;
      });
  }
});

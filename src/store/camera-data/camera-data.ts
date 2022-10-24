import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../consts/const';
import { PromoCameraType, CameraType } from '../../types/server-data-types';
import { CameraDataType } from '../../types/state-types';
import { fetchSelectedCameraAction, fetchCamerasAction, fetchPromoCameraAction, fetchSimilarCamerasAction, fetchCamerasReviewsAction } from '../api-actions';


export const initialState: CameraDataType = {
  cameras: [],
  isCamerasListLoading: false,
  promoCamera: {} as PromoCameraType,
  isPromoCameraLoading: false,
  selectedCamera: {} as CameraType,
  isSelectedCameraLoading: false,
  similarCameras: [],
  isSimilarCamerasLoading: false,
  reviewsList: [],
  isReviewsListLoading: false
};

export const camerasData = createSlice({
  name: NameSpace.Cameras,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCamerasAction.pending, (state) => {
        state.isCamerasListLoading = true;
      })
      .addCase(fetchCamerasAction.fulfilled, (state, action) => {
        state.isCamerasListLoading = false;
        state.cameras = action.payload;
      })
      .addCase(fetchCamerasAction.rejected, (state) => {
        state.isCamerasListLoading = false;
      })
      .addCase(fetchPromoCameraAction.pending, (state) => {
        state.isPromoCameraLoading = true;
      })
      .addCase(fetchPromoCameraAction.fulfilled, (state, action) => {
        state.isPromoCameraLoading = false;
        state.promoCamera = action.payload;
      })
      .addCase(fetchPromoCameraAction.rejected, (state) => {
        state.isPromoCameraLoading = false;
      })
      .addCase(fetchSelectedCameraAction.pending, (state) => {
        state.isSelectedCameraLoading = true;
      })
      .addCase(fetchSelectedCameraAction.fulfilled, (state, action) => {
        state.isSelectedCameraLoading = false;
        state.selectedCamera = action.payload;
      })
      .addCase(fetchSelectedCameraAction.rejected, (state) => {
        state.isSelectedCameraLoading = false;
      })
      .addCase(fetchSimilarCamerasAction.pending, (state) => {
        state.isSimilarCamerasLoading = true;
      })
      .addCase(fetchSimilarCamerasAction.fulfilled, (state, action) => {
        state.isSimilarCamerasLoading = false;
        state.similarCameras = action.payload;
      })
      .addCase(fetchSimilarCamerasAction.rejected, (state) => {
        state.isSimilarCamerasLoading = false;
      })
      .addCase(fetchCamerasReviewsAction.pending, (state) => {
        state.isReviewsListLoading = true;
      })
      .addCase(fetchCamerasReviewsAction.fulfilled, (state, action) => {
        state.isReviewsListLoading = false;
        state.reviewsList = action.payload;
      })
      .addCase(fetchCamerasReviewsAction.rejected, (state) => {
        state.isReviewsListLoading = false;
      });
  }
});

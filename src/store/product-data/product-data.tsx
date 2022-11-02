import { createSlice } from '@reduxjs/toolkit';
import { LoadingStatus, NameSpace } from '../../consts/const';
import { CameraType } from '../../types/server-data-types';
import { ProductDataType } from '../../types/state-types';
import { fetchSelectedCameraAction, fetchSimilarCamerasAction, fetchCamerasReviewsAction } from '../api-actions/product-api/product-api';


export const initialState: ProductDataType = {
  selectedCamera: {} as CameraType,
  isSelectedCameraLoading: LoadingStatus.Initial,
  similarCameras: [],
  isSimilarCamerasLoading: LoadingStatus.Initial,
  reviewsList: [],
  isReviewsListLoading: LoadingStatus.Initial
};

export const productData = createSlice({
  name: NameSpace.ProductData,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
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
        state.reviewsList = action.payload;
        state.isReviewsListLoading = LoadingStatus.Fulfilled;
      })
      .addCase(fetchCamerasReviewsAction.rejected, (state) => {
        state.isReviewsListLoading = LoadingStatus.Rejected;
      });
  }
});

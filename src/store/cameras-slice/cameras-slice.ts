import { createSlice } from '@reduxjs/toolkit';
import { LoadingStatus, NameSpace } from '../../consts/const';
import { CameraType } from '../../types/server-data-types';
import { CamerasSliceType, } from '../../types/state-types';
import { fetchCamerasAction } from '../api-actions/catalog-api/catalog-api';
import { fetchSelectedCameraAction, fetchSimilarCamerasAction } from '../api-actions/product-api/product-api';


export const initialState: CamerasSliceType = {
  cameras: [],
  camerasListLoadingStatus: LoadingStatus.Initial,
  selectedCamera: {} as CameraType,
  selectedCameraLoadingStatus: LoadingStatus.Initial,
  similarCameras: [],
  similarCamerasLoadingStatus: LoadingStatus.Initial,
  camerasCount: 0
};

export const camerasSlice = createSlice({
  name: NameSpace.Cameras,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCamerasAction.pending, (state) => {
        state.camerasListLoadingStatus = LoadingStatus.Pending;
      })
      .addCase(fetchCamerasAction.fulfilled, (state, action) => {
        state.cameras = action.payload.responsedData;
        state.camerasCount = Number(action.payload.responsedDataCount);
        state.camerasListLoadingStatus = LoadingStatus.Fulfilled;
      })
      .addCase(fetchCamerasAction.rejected, (state) => {
        state.camerasListLoadingStatus = LoadingStatus.Rejected;
      })
      .addCase(fetchSelectedCameraAction.pending, (state) => {
        state.selectedCameraLoadingStatus = LoadingStatus.Pending;
      })
      .addCase(fetchSelectedCameraAction.fulfilled, (state, action) => {
        state.selectedCamera = action.payload;
        state.selectedCameraLoadingStatus = LoadingStatus.Fulfilled;
      })
      .addCase(fetchSelectedCameraAction.rejected, (state) => {
        state.selectedCameraLoadingStatus = LoadingStatus.Rejected;
      })
      .addCase(fetchSimilarCamerasAction.pending, (state) => {
        state.similarCamerasLoadingStatus = LoadingStatus.Pending;
      })
      .addCase(fetchSimilarCamerasAction.fulfilled, (state, action) => {
        state.similarCameras = action.payload;
        state.similarCamerasLoadingStatus = LoadingStatus.Fulfilled;
      })
      .addCase(fetchSimilarCamerasAction.rejected, (state) => {
        state.similarCamerasLoadingStatus = LoadingStatus.Rejected;
      });
  }
});

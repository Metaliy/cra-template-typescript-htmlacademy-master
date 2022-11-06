import { createSlice } from '@reduxjs/toolkit';
import { LoadingStatus, NameSpace } from '../../consts/const';
import { CameraType } from '../../types/server-data-types';
import { CamerasSliceType, } from '../../types/state-types';
import { fetchCamerasAction } from '../api-actions/catalog-api/catalog-api';
import { fetchSelectedCameraAction, fetchSimilarCamerasAction } from '../api-actions/product-api/product-api';


export const initialState: CamerasSliceType = {
  cameras: [],
  isCamerasListLoading: LoadingStatus.Initial,
  selectedCamera: {} as CameraType,
  isSelectedCameraLoading: LoadingStatus.Initial,
  similarCameras: [],
  isSimilarCamerasLoading: LoadingStatus.Initial,
  camerasCount: 0
};

export const camerasSlice = createSlice({
  name: NameSpace.Cameras,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCamerasAction.pending, (state) => {
        state.isCamerasListLoading = LoadingStatus.Pending;
      })
      .addCase(fetchCamerasAction.fulfilled, (state, action) => {
        state.cameras = action.payload.responsedData;
        state.camerasCount = Number(action.payload.responsedDataCount);
        state.isCamerasListLoading = LoadingStatus.Fulfilled;
      })
      .addCase(fetchCamerasAction.rejected, (state) => {
        state.isCamerasListLoading = LoadingStatus.Rejected;
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
      });
  }
});

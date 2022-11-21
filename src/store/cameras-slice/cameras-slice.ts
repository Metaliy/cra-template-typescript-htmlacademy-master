import { createSlice } from '@reduxjs/toolkit';
import { LoadingStatus, NameSpace } from '../../consts/const';
import { CamerasSliceType, } from '../../types/state-types';
import { fetchCamerasAction } from '../api-actions/cameras-api/cameras-api';


export const initialState: CamerasSliceType = {
  cameras: [],
  camerasListLoadingStatus: LoadingStatus.Initial,
  camerasCount: 0,
  minCameraPrice: 0,
  maxCameraPrice: 0
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
        state.minCameraPrice = action.payload.responsedMinCamerasPrice;
        state.maxCameraPrice = action.payload.responsedMaxCamerasPrice;
      })
      .addCase(fetchCamerasAction.rejected, (state) => {
        state.camerasListLoadingStatus = LoadingStatus.Rejected;
      });
  }
});

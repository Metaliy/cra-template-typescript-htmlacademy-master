import { createSlice } from '@reduxjs/toolkit';
import { LoadingStatus, NameSpace } from '../../consts/const';
import { CameraType } from '../../types/server-data-types';
import { selectedCameraSliceType, } from '../../types/state-types';
import { fetchSelectedCameraAction } from '../api-actions/product-api/product-api';


export const initialState: selectedCameraSliceType = {

  selectedCamera: {} as CameraType,
  selectedCameraLoadingStatus: LoadingStatus.Initial,
};

export const selectedCameraSlice = createSlice({
  name: NameSpace.SelectedCamera,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchSelectedCameraAction.pending, (state) => {
        state.selectedCameraLoadingStatus = LoadingStatus.Pending;
      })
      .addCase(fetchSelectedCameraAction.fulfilled, (state, action) => {
        state.selectedCamera = action.payload;
        state.selectedCameraLoadingStatus = LoadingStatus.Fulfilled;
      })
      .addCase(fetchSelectedCameraAction.rejected, (state) => {
        state.selectedCameraLoadingStatus = LoadingStatus.Rejected;
      });
  }
});

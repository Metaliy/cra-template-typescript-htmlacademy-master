import { createSlice } from '@reduxjs/toolkit';
import { LoadingStatus, NameSpace } from '../../consts/const';
import { CamerasSliceType, } from '../../types/state-types';
import { fetchCamerasAction } from '../api-actions/catalog-api/catalog-api';


export const initialState: CamerasSliceType = {
  cameras: [],
  camerasListLoadingStatus: LoadingStatus.Initial,
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
      });
  }
});

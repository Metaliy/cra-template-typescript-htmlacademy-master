import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../consts/const';
import { CameraDataType } from '../../types/state-types';
import { fetchCamerasAction } from '../api-actions';


export const initialState: CameraDataType = {
  cameras: [],
  isCamerasListLoading: false,
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
        // eslint-disable-next-line no-console
        console.log('downloading error');
      });
  }
});

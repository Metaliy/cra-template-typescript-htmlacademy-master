import { createSlice } from '@reduxjs/toolkit';
import { LoadingStatus, NameSpace } from '../../../consts/const';
import { similarCamerasSliceType, } from '../../../types/state-types';
import { fetchSimilarCamerasAction } from '../../api-actions/similar-cameras-api/similar-cameras-api';


export const initialState: similarCamerasSliceType = {
  similarCameras: [],
  similarCamerasLoadingStatus: LoadingStatus.Initial,
};

export const similarCamerasSlice = createSlice({
  name: NameSpace.SimilarCameras,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
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

import { createSlice } from '@reduxjs/toolkit';
import { LoadingStatus, NameSpace } from '../../consts/const';
import { SearchedCamerasSliceType, } from '../../types/state-types';
import { fetchSearchedCamerasAction } from '../api-actions/searched-cameras-api/searched-cameras-api';


export const initialState: SearchedCamerasSliceType = {
  searchedCameras: [],
  searchedCamerasListLoadingStatus: LoadingStatus.Initial,
};

export const searchedCamerasSlice = createSlice({
  name: NameSpace.SearchedCameras,
  initialState,
  reducers: {
    emptySearchedCameraList: (state) => {
      state.searchedCameras = [];
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchSearchedCamerasAction.pending, (state) => {
        state.searchedCamerasListLoadingStatus = LoadingStatus.Pending;
      })
      .addCase(fetchSearchedCamerasAction.fulfilled, (state, action) => {
        if (action.payload) {
          state.searchedCameras = action.payload;
        }
        state.searchedCamerasListLoadingStatus = LoadingStatus.Fulfilled;
      })
      .addCase(fetchSearchedCamerasAction.rejected, (state) => {
        state.searchedCamerasListLoadingStatus = LoadingStatus.Rejected;
      });
  }
});

export const {emptySearchedCameraList} = searchedCamerasSlice.actions;

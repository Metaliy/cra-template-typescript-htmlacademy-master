import { createSlice } from '@reduxjs/toolkit';
import { LoadingStatus, NameSpace } from '../../consts/const';
import { PromoCameraType } from '../../types/server-data-types';
import { CatalogDataType } from '../../types/state-types';
import { fetchCamerasAction, fetchPromoCameraAction } from '../api-actions/catalog-api/catalog-api';


export const initialState: CatalogDataType = {
  cameras: [],
  isCamerasListLoading: LoadingStatus.Initial,
  promoCamera: {} as PromoCameraType,
  isPromoCameraLoading: LoadingStatus.Initial
};

export const catalogData = createSlice({
  name: NameSpace.CatalogData,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCamerasAction.pending, (state) => {
        state.isCamerasListLoading = LoadingStatus.Pending;
      })
      .addCase(fetchCamerasAction.fulfilled, (state, action) => {
        state.cameras = action.payload;
        state.isCamerasListLoading = LoadingStatus.Fulfilled;
      })
      .addCase(fetchCamerasAction.rejected, (state) => {
        state.isCamerasListLoading = LoadingStatus.Rejected;
      })
      .addCase(fetchPromoCameraAction.pending, (state) => {
        state.isPromoCameraLoading = LoadingStatus.Pending;
      })
      .addCase(fetchPromoCameraAction.fulfilled, (state, action) => {
        state.promoCamera = action.payload;
        state.isPromoCameraLoading = LoadingStatus.Fulfilled;
      })
      .addCase(fetchPromoCameraAction.rejected, (state) => {
        state.isPromoCameraLoading = LoadingStatus.Rejected;
      });
  }
});

import { createSlice } from '@reduxjs/toolkit';
import { LoadingStatus, NameSpace } from '../../consts/const';
import { PromoCameraType } from '../../types/server-data-types';
import { PromoSliceType } from '../../types/state-types';
import { fetchPromoCameraAction } from '../api-actions/catalog-api/catalog-api';


export const initialState: PromoSliceType = {
  promoCamera: {} as PromoCameraType,
  promoCameraLoadingStatus: LoadingStatus.Initial
};

export const promoSlice = createSlice({
  name: NameSpace.Promo,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPromoCameraAction.pending, (state) => {
        state.promoCameraLoadingStatus = LoadingStatus.Pending;
      })
      .addCase(fetchPromoCameraAction.fulfilled, (state, action) => {
        state.promoCamera = action.payload;
        state.promoCameraLoadingStatus = LoadingStatus.Fulfilled;
      })
      .addCase(fetchPromoCameraAction.rejected, (state) => {
        state.promoCameraLoadingStatus = LoadingStatus.Rejected;
      });
  }
});

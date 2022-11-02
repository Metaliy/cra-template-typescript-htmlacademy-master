import { createSlice } from '@reduxjs/toolkit';
import { LoadingStatus, NameSpace } from '../../consts/const';
import { ProductProcessType } from '../../types/state-types';
import { postCameraReview } from '../api-actions/product-api/product-api';

const initialState: ProductProcessType = {
  reviewSentStatus: LoadingStatus.Initial,
};

export const productProcess = createSlice({
  name: NameSpace.ProductProcess,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(postCameraReview.pending, (state) => {
        state.reviewSentStatus = LoadingStatus.Pending;
      })
      .addCase(postCameraReview.rejected, (state) => {
        state.reviewSentStatus = LoadingStatus.Rejected;
      })
      .addCase(postCameraReview.fulfilled, (state) => {
        state.reviewSentStatus = LoadingStatus.Fulfilled;
      });
  }});

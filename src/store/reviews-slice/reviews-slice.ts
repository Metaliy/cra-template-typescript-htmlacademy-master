
import { createSlice } from '@reduxjs/toolkit';
import { LoadingStatus, NameSpace } from '../../consts/const';
import { ReviewsSliceType } from '../../types/state-types';
import { fetchCamerasReviewsAction } from '../api-actions/product-api/product-api';


export const initialState: ReviewsSliceType = {
  reviewsList: [],
  reviewsListLoadingStatus: LoadingStatus.Initial,
};

export const reviewsSlice = createSlice({
  name: NameSpace.Reviews,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCamerasReviewsAction.pending, (state) => {
        state.reviewsListLoadingStatus = LoadingStatus.Pending;
      })
      .addCase(fetchCamerasReviewsAction.fulfilled, (state, action) => {
        state.reviewsList = action.payload;
        state.reviewsListLoadingStatus = LoadingStatus.Fulfilled;
      })
      .addCase(fetchCamerasReviewsAction.rejected, (state) => {
        state.reviewsListLoadingStatus = LoadingStatus.Rejected;
      });
  }
});

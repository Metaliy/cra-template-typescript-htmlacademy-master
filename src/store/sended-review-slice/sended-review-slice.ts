import { createSlice } from '@reduxjs/toolkit';
import { LoadingStatus, NameSpace } from '../../consts/const';
import { SendedReviewSliceType } from '../../types/state-types';
import { postCameraReviewAction } from '../api-actions/sended-review-api/sended-review-api';


export const initialState: SendedReviewSliceType = {
  reviewSentStatus: LoadingStatus.Initial,
};

export const sendedReviewSlice = createSlice({
  name: NameSpace.SendedReview,
  initialState,
  reducers: {
    reviewsInitalState : (state) => {
      state.reviewSentStatus = LoadingStatus.Initial;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(postCameraReviewAction.pending, (state) => {
        state.reviewSentStatus = LoadingStatus.Pending;
      })
      .addCase(postCameraReviewAction.rejected, (state) => {
        state.reviewSentStatus = LoadingStatus.Rejected;
      })
      .addCase(postCameraReviewAction.fulfilled, (state) => {
        state.reviewSentStatus = LoadingStatus.Fulfilled;
      });
  }
});

export const {reviewsInitalState} = sendedReviewSlice.actions;

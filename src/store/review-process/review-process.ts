import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../consts/const';
import { ReviewPostProcessType } from '../../types/state-types';
import { postCameraReview } from '../api-actions';

const initialState: ReviewPostProcessType = {
  reviewSentStatus: false,
  reviewSentErrorStatus: false
};

export const reviewProcess = createSlice({
  name: NameSpace.Review,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(postCameraReview.pending, (state) => {
        state.reviewSentStatus = true;
      })
      .addCase(postCameraReview.rejected, (state) => {
        state.reviewSentStatus = false;
        state.reviewSentErrorStatus = true;
      })
      .addCase(postCameraReview.fulfilled, (state) => {
        state.reviewSentStatus = false;
        if (state.reviewSentErrorStatus === true) {
          state.reviewSentErrorStatus = false;
        }
      });
  }});

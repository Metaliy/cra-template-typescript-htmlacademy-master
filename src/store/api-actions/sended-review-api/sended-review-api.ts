import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { toast } from 'react-toastify';
import {ToastMessages } from '../../../consts/const';
import { PostReviewType } from '../../../types/server-data-types';
import { AppDispatch, State } from '../../../types/state-types';


export const postCameraReviewAction = createAsyncThunk<void, PostReviewType, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/postCameraReviewAction',
  async (review, {extra: api}) => {
    try {
      await api.post('/reviews', review);
    } catch (error) {
      toast.error(ToastMessages.PostError);
      throw error;
    }
  },
);

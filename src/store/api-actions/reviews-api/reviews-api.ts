import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { toast } from 'react-toastify';
import {ToastMessages } from '../../../consts/const';
import { ReviewType } from '../../../types/server-data-types';
import { AppDispatch, State } from '../../../types/state-types';


export const fetchCamerasReviewsAction = createAsyncThunk<ReviewType[], number, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchCamerasReviews',
  async (selectedCameraId, {extra: api}) => {
    try {
      const {data} = await api.get<ReviewType[]>(`/cameras/${selectedCameraId}/reviews`);
      return data;
    } catch (error) {
      toast.error(ToastMessages.ReviewsLoadError);
      throw error;
    }
  },
);

import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { toast } from 'react-toastify';
import {ToastMessages } from '../../../consts/const';
import { CameraType, PostReviewType, ReviewType } from '../../../types/server-data-types';
import { AppDispatch, State } from '../../../types/state-types';


export const fetchSelectedCameraAction = createAsyncThunk<CameraType, number, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchSelectedCamera',
  async (cameraId, {extra: api}) => {
    try {
      const {data} = await api.get<CameraType>(`/cameras/${cameraId}`);
      return data;
    } catch (error) {
      toast.error(ToastMessages.SelectedCamerasLoadError);
      throw error;
    }
  },
);

export const fetchSimilarCamerasAction = createAsyncThunk<CameraType[], number, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchSimilarCameras',
  async (selectedCameraId, {extra: api}) => {
    try {
      const {data} = await api.get<CameraType[]>(`/cameras/${selectedCameraId}/similar`);
      return data;
    } catch (error) {
      toast.error(ToastMessages.SimilarCamerasLoadError);
      throw error;
    }
  },
);

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

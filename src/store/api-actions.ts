import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { ITEMS_PER_PAGE } from '../consts/const';
import { CameraType, PostReviewType, PromoCameraType, ReviewType } from '../types/server-data-types';
import { AppDispatch, State } from '../types/state-types';


export const fetchCamerasAction = createAsyncThunk<CameraType[], number, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchCameras',
  async (currentPage, {extra: api}) => {
    try {
      const {data} = await api.get<CameraType[]>(`/cameras?_start=${(currentPage * ITEMS_PER_PAGE) - ITEMS_PER_PAGE}&_end=${currentPage * ITEMS_PER_PAGE}`);
      return data;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('server error');
      throw error;
    }
  },
);

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
      // eslint-disable-next-line no-console
      console.log('server error');
      throw error;
    }
  },
);

export const fetchPromoCameraAction = createAsyncThunk<PromoCameraType, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchPromoCamera',
  async (_arg, {extra: api}) => {
    try {
      const {data} = await api.get<PromoCameraType>('/promo');
      return data;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('server error');
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
      // eslint-disable-next-line no-console
      console.log('server error');
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
      // eslint-disable-next-line no-console
      console.log('server error');
      throw error;
    }
  },
);

export const postCameraReview = createAsyncThunk<void, PostReviewType, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/postCameraReview',
  async (review, {extra: api}) => {
    try {

      // eslint-disable-next-line no-console
      console.log(review);
      await api.post('/reviews', review);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('post error');
      throw error;
    }
  },
);

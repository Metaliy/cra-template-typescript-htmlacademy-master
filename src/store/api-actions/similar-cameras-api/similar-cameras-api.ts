import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { toast } from 'react-toastify';
import {ToastMessages } from '../../../consts/const';
import { CameraType } from '../../../types/server-data-types';
import { AppDispatch, State } from '../../../types/state-types';


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

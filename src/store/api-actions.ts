import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { CameraType } from '../types/server-data-types';
import { AppDispatch, State } from '../types/state-types';

export const fetchCamerasAction = createAsyncThunk<CameraType[], undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchCameras',
  async (_arg, {extra: api}) => {
    try {
      const {data} = await api.get<CameraType[]>('/cameras');
      return data;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('server error');
      throw error;
    }
  },
);

import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { toast } from 'react-toastify';
import { ITEMS_PER_PAGE, ToastMessages } from '../../../consts/const';
import { CameraType, PromoCameraType } from '../../../types/server-data-types';
import { AppDispatch, State } from '../../../types/state-types';


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
      toast.error(ToastMessages.CamerasListLoadError);
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
      toast.error(ToastMessages.PromoCameraLoadError);
      throw error;
    }
  },
);

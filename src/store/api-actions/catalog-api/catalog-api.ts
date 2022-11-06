import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { toast } from 'react-toastify';
import { CAMERAS_ON_PAGE, ToastMessages } from '../../../consts/const';
import { CameraType, PromoCameraType } from '../../../types/server-data-types';
import { AppDispatch, FetchCamerasActionResponsedType, State } from '../../../types/state-types';


export const fetchCamerasAction = createAsyncThunk<FetchCamerasActionResponsedType, number, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchCameras',
  async (currentPage, {extra: api}) => {
    try {

      const serverResponse = await api.get<CameraType[]>(`/cameras?_page=${currentPage}&_limit=${CAMERAS_ON_PAGE}`);

      return {
        responsedDataCount: serverResponse.headers['x-total-count'],
        responsedData: serverResponse.data
      };
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

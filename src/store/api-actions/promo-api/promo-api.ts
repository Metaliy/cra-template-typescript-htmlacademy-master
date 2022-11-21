import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { toast } from 'react-toastify';
import { ToastMessages } from '../../../consts/const';
import { PromoCameraType } from '../../../types/server-data-types';
import { AppDispatch, State } from '../../../types/state-types';


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



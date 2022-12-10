import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { toast } from 'react-toastify';
import {ToastMessages } from '../../../consts/const';
import { PostOrderType } from '../../../types/server-data-types';
import { AppDispatch, State } from '../../../types/state-types';


export const postCameraOrderAction = createAsyncThunk<void, PostOrderType, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/postCameraOrderAction',
  async (order, {extra: api}) => {
    try {
      await api.post('/orders', order);
      // eslint-disable-next-line no-console
      console.log(order);
    } catch (error) {
      toast.error(ToastMessages.PostOrderError);
      throw error;
    }
  },
);

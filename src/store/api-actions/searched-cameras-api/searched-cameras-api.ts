import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { toast } from 'react-toastify';
import { ToastMessages } from '../../../consts/const';
import { CameraType } from '../../../types/server-data-types';
import { AppDispatch, State } from '../../../types/state-types';


export const fetchSearchedCamerasAction = createAsyncThunk<CameraType[], string, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchSearchedCameras',
  async (userInputCamerasName, {extra: api}) => {
    try {
      const {data} = await api.get<CameraType[]>(`/cameras?name_like=${userInputCamerasName}`);
      // eslint-disable-next-line no-console
      console.log(data);
      return data;
    } catch (error) {
      toast.error(ToastMessages.PromoCameraLoadError);
      throw error;
    }

  },
);

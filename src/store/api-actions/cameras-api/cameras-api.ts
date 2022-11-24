import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { toast } from 'react-toastify';
import { CAMERAS_ON_PAGE, QueryParameter, ToastMessages } from '../../../consts/const';
import { CameraType } from '../../../types/server-data-types';
import { AppDispatch, CatalogSliceType, FetchCamerasActionResponsedType, State } from '../../../types/state-types';


export const fetchCamerasAction = createAsyncThunk<FetchCamerasActionResponsedType, CatalogSliceType, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchCameras',
  async ({currentPage, sort, filters}, {extra: api}) => {
    const {sortType, order} = sort;
    const {priceMin, priceMax, category, filterType, level} = filters;
    try {

      const serverResponse = await api.get<CameraType[]>('/cameras', {
        params: {
          [QueryParameter.Page] : currentPage,
          [QueryParameter.SortType] : sortType,
          [QueryParameter.Order] : order,
          [QueryParameter.Limit] : CAMERAS_ON_PAGE,
          [QueryParameter.PriceMin] : priceMin,
          [QueryParameter.PriceMax] : priceMax,
          [QueryParameter.Category] : category,
          [QueryParameter.Type] : filterType,
          [QueryParameter.Level] : level,
        }
      }
      );

      return {
        responsedDataCount: serverResponse.headers['x-total-count'],
        responsedData: serverResponse.data,
      };
    } catch (error) {
      toast.error(ToastMessages.CamerasListLoadError);
      throw error;
    }
  },
);

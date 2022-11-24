import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { toast } from 'react-toastify';
import { QueryParameter, SortTypeParameter, SortOrderParameter, ToastMessages } from '../../../consts/const';
import { CamerasPriceRangeType, CameraType } from '../../../types/server-data-types';
import { FetchMinMaxCamerasResponsedType, AppDispatch, State } from '../../../types/state-types';


export const fetchMinMaxPriceCamerasAction = createAsyncThunk<CamerasPriceRangeType, FetchMinMaxCamerasResponsedType, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchCamerasMinMaxPriceRange',
  async (filters, {extra: api}) => {
    const {priceMin, priceMax, category, filterType, level} = filters;
    try {

      const {data} = await api.get<CameraType[]>('/cameras', {
        params: {
          [QueryParameter.SortType] : SortTypeParameter.Price,
          [QueryParameter.Order] : SortOrderParameter.LowToHigh,
          [QueryParameter.PriceMin] : priceMin,
          [QueryParameter.PriceMax] : priceMax,
          [QueryParameter.Category] : category,
          [QueryParameter.Type] : filterType,
          [QueryParameter.Level] : level,
        }
      }
      );

      const minCamerasPrice = data.length ? data[0].price : 0;
      const maxCamerasPrice = data.length ? data[data.length - 1].price : 0;

      return {
        minPrice: minCamerasPrice,
        maxPrice: maxCamerasPrice
      };
    } catch (error) {
      toast.error(ToastMessages.CamerasListLoadError);
      throw error;
    }
  },
);

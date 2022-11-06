import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../consts/const';
import { camerasSlice } from './cameras-slice/cameras-slice';
import { catalogSlice } from './catalog-slice/catalog-slice';
import { productSlice } from './product-slice/product-slice';
import { promoSlice } from './promo-slice/promo-slice';
import { reviewsSlice } from './reviews-slice/reviews-slice';

export const rootReducer = combineReducers({
  [NameSpace.Cameras]: camerasSlice.reducer,
  [NameSpace.Promo]: promoSlice.reducer,
  [NameSpace.Reviews]: reviewsSlice.reducer,
  [NameSpace.Catalog]: catalogSlice.reducer,
  [NameSpace.Product]: productSlice.reducer,
});


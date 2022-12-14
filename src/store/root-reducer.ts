import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../consts/const';
import { addItemModalSlice } from './slices/add-item-modal-slice/add-item-modal-slice';
import { basketSlice } from './slices/basket-slice/basket-slice';
import { camerasSlice } from './slices/cameras-slice/cameras-slice';
import { catalogSlice } from './slices/catalog-slice/catalog-slice';
import { couponSlice } from './slices/coupon-slice/coupon-slice';
import { orderSlice } from './slices/order-slice/order-slice';
import { productSlice } from './slices/product-slice/product-slice';
import { promoSlice } from './slices/promo-slice/promo-slice';
import { reviewsSlice } from './slices/reviews-slice/reviews-slice';
import { searchedCamerasSlice } from './slices/searched-cameras-slice/searched-cameras-slice';
import { selectedCameraSlice } from './slices/selected-camera-slice/selected-camera-slice';
import { sendedReviewSlice } from './slices/sended-review-slice/sended-review-slice';
import { similarCamerasSlice } from './slices/similar-cameras-slice/similar-cameras-slice';

export const rootReducer = combineReducers({
  [NameSpace.Cameras]: camerasSlice.reducer,
  [NameSpace.SelectedCamera]: selectedCameraSlice.reducer,
  [NameSpace.SimilarCameras]: similarCamerasSlice.reducer,
  [NameSpace.Promo]: promoSlice.reducer,
  [NameSpace.Reviews]: reviewsSlice.reducer,
  [NameSpace.SendedReview]: sendedReviewSlice.reducer,
  [NameSpace.Catalog]: catalogSlice.reducer,
  [NameSpace.Product]: productSlice.reducer,
  [NameSpace.SearchedCameras]: searchedCamerasSlice.reducer,
  [NameSpace.Basket]: basketSlice.reducer,
  [NameSpace.AddItemModal]: addItemModalSlice.reducer,
  [NameSpace.Coupon]: couponSlice.reducer,
  [NameSpace.Order]: orderSlice.reducer
});


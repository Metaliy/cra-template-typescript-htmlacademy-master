import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../consts/const';
import { camerasSlice } from './cameras-slice/cameras-slice';
import { catalogSlice } from './catalog-slice/catalog-slice';
import { productSlice } from './product-slice/product-slice';
import { promoSlice } from './promo-slice/promo-slice';
import { reviewsSlice } from './reviews-slice/reviews-slice';
import { searchedCamerasSlice } from './searched-cameras-slice/searched-cameras-slice';
import { selectedCameraSlice } from './selected-camera-slice/selected-camera-slice';
import { sendedReviewSlice } from './sended-review-slice/sended-review-slice';
import { similarCamerasSlice } from './similar-cameras-slice/similar-cameras-slice';

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
});


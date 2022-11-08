import {CameraType, PromoCameraType, ReviewType} from './server-data-types';
import { store } from '../store/index.js';
import { LoadingStatus } from '../consts/const';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type PromoSliceType = {
  promoCamera: PromoCameraType,
  promoCameraLoadingStatus: LoadingStatus
}

export type ReviewsSliceType = {
  reviewsList: ReviewType[],
  reviewsListLoadingStatus: LoadingStatus
}

export type CatalogSliceType = {
  currentPage: number
}

export type FetchCamerasActionResponsedType = {
  responsedDataCount: number;
  responsedData: CameraType[];
}

export type ProductSliceType = {
  reviewModalOpenedStatus: boolean
}

export type CamerasSliceType = {
  cameras: CameraType[],
  camerasListLoadingStatus: LoadingStatus,
  camerasCount: number
}

export type selectedCameraSliceType = {
  selectedCamera: CameraType,
  selectedCameraLoadingStatus: LoadingStatus,
}

export type similarCamerasSliceType = {
  similarCameras: CameraType[],
  similarCamerasLoadingStatus: LoadingStatus,
}

export type SendedReviewSliceType = {
  reviewSentStatus: LoadingStatus,
}

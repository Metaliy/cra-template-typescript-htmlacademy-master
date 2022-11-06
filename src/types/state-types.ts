import {CameraType, PromoCameraType, ReviewType} from './server-data-types';
import { store } from '../store/index.js';
import { LoadingStatus } from '../consts/const';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type CamerasSliceType = {
  cameras: CameraType[],
  camerasListLoadingStatus: LoadingStatus,
  selectedCamera: CameraType,
  selectedCameraLoadingStatus: LoadingStatus,
  similarCameras: CameraType[],
  similarCamerasLoadingStatus: LoadingStatus,
  camerasCount: number
}

export type PromoSliceType = {
  promoCamera: PromoCameraType,
  promoCameraLoadingStatus: LoadingStatus
}

export type ReviewsSliceType = {
  reviewsList: ReviewType[],
  reviewsListLoadingStatus: LoadingStatus,
  reviewSentStatus: LoadingStatus,
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

import {CameraType, PromoCameraType, ReviewType} from './server-data-types';
import { store } from '../store/index.js';
import { LoadingStatus } from '../consts/const';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type CatalogDataType = {
  cameras: CameraType[],
  isCamerasListLoading: LoadingStatus,
  promoCamera: PromoCameraType,
  isPromoCameraLoading: LoadingStatus
}

export type CatalogProcessType = {
  currentPage: number
}

export type ProductProcessType = {
  reviewSentStatus: LoadingStatus,
}

export type ProductDataType = {
  selectedCamera: CameraType,
  isSelectedCameraLoading: LoadingStatus,
  similarCameras: CameraType[],
  isSimilarCamerasLoading: LoadingStatus,
  reviewsList: ReviewType[],
  isReviewsListLoading: LoadingStatus
}

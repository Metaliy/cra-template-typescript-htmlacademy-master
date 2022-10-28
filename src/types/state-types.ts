import {CameraType, PromoCameraType, ReviewType} from './server-data-types';
import { store } from '../store/index.js';
import { LoadingStatus } from '../consts/const';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type CameraDataType = {
  cameras: CameraType[],
  isCamerasListLoading: LoadingStatus,
  promoCamera: PromoCameraType,
  isPromoCameraLoading: LoadingStatus,
  selectedCamera: CameraType,
  isSelectedCameraLoading: LoadingStatus,
  similarCameras: CameraType[],
  isSimilarCamerasLoading: LoadingStatus,
  reviewsList: ReviewType[],
  isReviewsListLoading: LoadingStatus
}

export type CatalogProcessType = {
  currentPage: number
}

export type ReviewPostProcessType = {
  reviewSentStatus: boolean,
  reviewSentErrorStatus: boolean
}

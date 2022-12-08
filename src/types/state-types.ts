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
  currentPage: number,
  sort: {
    sortType: string,
    order: string
  }
  filters: {
    priceMin: string | string[],
    priceMax: string |string[],
    category: string[],
    filterType: string[],
    level: string[]
  }
}

export type FetchMinMaxCamerasResponsedType = {
    priceMin: string | string[],
    priceMax: string |string[],
    category: string[],
    filterType: string[],
    level: string[]
}

export type FetchCamerasActionResponsedType = {
  responsedDataCount: number,
  responsedData: CameraType[]
}

export type ProductSliceType = {
  reviewModalOpenedStatus: boolean
}

export type BasketSliceType = {
  addedItems: {
    camera: CameraType,
    camerasCount: number
  }[],
  numberOfItemsAdded : number
}

export type AddItemModalSliceType = {
  addItemModalOpenedStatus: boolean
}

export type CamerasSliceType = {
  cameras: CameraType[],
  camerasListLoadingStatus: LoadingStatus,
  camerasCount: number,
  minCameraPrice: number,
  maxCameraPrice: number
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

export type SearchedCamerasSliceType = {
  searchedCameras: CameraType[],
  searchedCamerasListLoadingStatus: LoadingStatus,
}

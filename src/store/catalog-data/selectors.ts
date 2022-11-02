import { LoadingStatus, NameSpace } from '../../consts/const';
import { CameraType, PromoCameraType } from '../../types/server-data-types';
import { State } from '../../types/state-types';


export const getCameras = (state: State): CameraType[] => state[NameSpace.CatalogData].cameras;

export const getCamerasListLoadingStatus = (state: State): LoadingStatus => state[NameSpace.CatalogData].isCamerasListLoading;

export const getPromoCamera = (state: State): PromoCameraType => state[NameSpace.CatalogData].promoCamera;

export const getPromoCameraListLoadingStatus = (state: State): LoadingStatus => state[NameSpace.CatalogData].isPromoCameraLoading;


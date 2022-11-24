import { LoadingStatus, NameSpace } from '../../../consts/const';
import { CameraType } from '../../../types/server-data-types';
import { State } from '../../../types/state-types';


export const getCameras = (state: State): CameraType[] => state[NameSpace.Cameras].cameras;

export const getCamerasListLoadingStatus = (state: State): LoadingStatus => state[NameSpace.Cameras].camerasListLoadingStatus;

export const getTotalCamerasCount = (state: State): number => state[NameSpace.Cameras].camerasCount;

export const getMinCamerasPrice = (state: State): number => state[NameSpace.Cameras].minCameraPrice;

export const getMaxCamerasPrice = (state: State): number => state[NameSpace.Cameras].maxCameraPrice;

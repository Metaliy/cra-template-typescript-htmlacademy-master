
import { LoadingStatus, NameSpace } from '../../consts/const';
import { CameraType } from '../../types/server-data-types';
import { State } from '../../types/state-types';


export const getSearchedCameras = (state: State): CameraType[] => state[NameSpace.SearchedCameras].searchedCameras;

export const getSearchedCamerasListLoadingStatus = (state: State): LoadingStatus => state[NameSpace.SearchedCameras].searchedCamerasListLoadingStatus;


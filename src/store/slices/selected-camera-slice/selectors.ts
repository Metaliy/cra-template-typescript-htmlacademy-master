import { State } from '../../../types/state-types';
import { NameSpace, LoadingStatus } from '../../../consts/const';
import { CameraType } from '../../../types/server-data-types';


export const getSelectedCamera = (state: State): CameraType => state[NameSpace.SelectedCamera].selectedCamera;

export const getSelectedCameraLoadingStatus = (state: State): LoadingStatus => state[NameSpace.SelectedCamera].selectedCameraLoadingStatus;

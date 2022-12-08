import { NameSpace } from '../../../consts/const';
import { CameraType } from '../../../types/server-data-types';
import { State } from '../../../types/state-types';


export const getAddItemModalOpenedStatus = (state: State): boolean => state[NameSpace.AddItemModal].addItemModalOpenedStatus;

export const getAddedItem = (state: State): CameraType | undefined => state[NameSpace.AddItemModal].addedCamera;

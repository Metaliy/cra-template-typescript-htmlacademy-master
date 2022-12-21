import { NameSpace } from '../../../consts/const';
import { CameraType } from '../../../types/server-data-types';
import { State } from '../../../types/state-types';


export const getAddItemModalOpenedStatus = (state: State): boolean => state[NameSpace.AddItemModal].isAddItemModal;

export const getAddedItem = (state: State): CameraType | null => state[NameSpace.AddItemModal].addedCamera;

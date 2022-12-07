import { NameSpace } from '../../../consts/const';
import { State } from '../../../types/state-types';


export const getAddItemModalOpenedStatus = (state: State): boolean => state[NameSpace.AddItemModal].addItemModalOpenedStatus;

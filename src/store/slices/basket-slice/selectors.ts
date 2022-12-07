import { NameSpace } from '../../../consts/const';
import { State } from '../../../types/state-types';


export const getaddedOnBasketItems = (state: State): boolean => state[NameSpace.Product].reviewModalOpenedStatus;

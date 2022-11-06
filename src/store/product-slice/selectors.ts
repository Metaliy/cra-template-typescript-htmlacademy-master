import { NameSpace } from '../../consts/const';
import { State } from '../../types/state-types';


export const getReviewModalOpenedStatus = (state: State): boolean => state[NameSpace.Product].reviewModalOpenedStatus;

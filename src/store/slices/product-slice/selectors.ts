import { NameSpace } from '../../../consts/const';
import { State } from '../../../types/state-types';


export const getReviewModal = (state: State): boolean => state[NameSpace.Product].isReviewModal;

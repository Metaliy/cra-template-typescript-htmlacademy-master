import { State } from '../../../types/state-types';
import { LoadingStatus, NameSpace } from '../../../consts/const';


export const getOrderSentStatus = (state: State): LoadingStatus => state[NameSpace.Order].orderSentStatus;

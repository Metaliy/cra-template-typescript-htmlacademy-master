import { NameSpace } from '../../consts/const';
import { State } from '../../types/state-types';


export const getReviewSentStatus = (state: State): boolean => state[NameSpace.Review].reviewSentStatus;

export const getReviewErrorStatus = (state: State): boolean => state[NameSpace.Review].reviewSentErrorStatus;

import { LoadingStatus, NameSpace } from '../../../consts/const';
import { State } from '../../../types/state-types';


export const getReviewSentStatus = (state: State): LoadingStatus => state[NameSpace.SendedReview].reviewSentStatus;

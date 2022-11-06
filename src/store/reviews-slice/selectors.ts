import { LoadingStatus, NameSpace } from '../../consts/const';
import { ReviewType } from '../../types/server-data-types';
import { State } from '../../types/state-types';

export const getReviewsList = (state: State): ReviewType[] => state[NameSpace.Reviews].reviewsList;

export const getReviewsListLoadingStatus = (state: State): LoadingStatus => state[NameSpace.Reviews].reviewsListLoadingStatus;

export const getReviewSentStatus = (state: State): LoadingStatus => state[NameSpace.Reviews].reviewSentStatus;

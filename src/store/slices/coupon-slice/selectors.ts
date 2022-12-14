import { LoadingStatus, NameSpace } from '../../../consts/const';
import { State } from '../../../types/state-types';


export const getDiscountPercentage = (state: State): number => state[NameSpace.Coupon].discountPercentage;

export const getCouponStatus = (state: State): LoadingStatus => state[NameSpace.Coupon].couponStatus;

export const getCouponName = (state: State): string | null => state[NameSpace.Coupon].couponName;

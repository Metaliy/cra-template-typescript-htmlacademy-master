import { useEffect } from 'react';
import { LoadingStatus } from '../../../consts/const';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { getReviewModalOpenedStatus } from '../../../store/product-slice/selectors';
import { getReviewSentStatus } from '../../../store/reviews-slice/selectors';
import { ReviewModalForm } from './review-modal-form/review-modal-form';
import { ReviewModalSuccess } from './review-modal-success/review-modal-success';
import { setReviewsToInitalStateAfterSuccesSend } from '../../../store/reviews-slice/reviews-slice';


function ReviewModal () {

  const dispatch = useAppDispatch();
  const reviewSentStatus = useAppSelector(getReviewSentStatus);
  const reviewModalOpenedStatus = useAppSelector(getReviewModalOpenedStatus);


  const reviewSentStatusSuccess = reviewSentStatus === LoadingStatus.Fulfilled;

  useEffect(() => {
    if (reviewSentStatus !== LoadingStatus.Initial) {
      dispatch(setReviewsToInitalStateAfterSuccesSend());
    }
  }, [dispatch, reviewModalOpenedStatus]);


  return (
    reviewSentStatusSuccess && reviewModalOpenedStatus ? <ReviewModalSuccess/> :
      <ReviewModalForm />
  );
}

export {ReviewModal};

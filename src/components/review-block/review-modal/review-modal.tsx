import { useEffect } from 'react';
import { LoadingStatus } from '../../../consts/const';
import { useAppDispatch } from '../../../hooks/hooks';

import { ReviewModalForm } from './review-modal-form/review-modal-form';
import { ReviewModalSuccess } from './review-modal-success/review-modal-success';
import { setReviewsToInitalStateAfterSuccesSend } from '../../../store/reviews-slice/reviews-slice';

type ReviewModalProps = {
  reviewSentStatus: LoadingStatus,
  reviewModalOpenedStatus: boolean,
  cameraId: number
}

function ReviewModal ({reviewSentStatus, reviewModalOpenedStatus, cameraId}: ReviewModalProps) {

  const dispatch = useAppDispatch();

  const reviewSentStatusSuccess = reviewSentStatus === LoadingStatus.Fulfilled;

  useEffect(() => {
    if (reviewSentStatus !== LoadingStatus.Initial) {
      dispatch(setReviewsToInitalStateAfterSuccesSend());
    }
  }, [dispatch, reviewModalOpenedStatus]);


  return (
    reviewSentStatusSuccess && reviewModalOpenedStatus ? <ReviewModalSuccess/> :
      <ReviewModalForm cameraId={cameraId} reviewModalOpenedStatus={reviewModalOpenedStatus} />
  );
}

export {ReviewModal};

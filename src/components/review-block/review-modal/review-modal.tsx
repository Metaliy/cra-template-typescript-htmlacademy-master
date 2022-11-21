import { useEffect } from 'react';
import { LoadingStatus } from '../../../consts/const';
import { useAppDispatch } from '../../../hooks/hooks';
import { reviewsInitalState } from '../../../store/sended-review-slice/sended-review-slice';

import { ReviewModalWithForm } from './review-modal-with-form/review-modal-with-form';
import { ReviewModalSuccess } from './review-modal-success/review-modal-success';

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
      dispatch(reviewsInitalState());
    }
  }, [dispatch, reviewModalOpenedStatus]);


  return (
    reviewSentStatusSuccess && reviewModalOpenedStatus ? <ReviewModalSuccess/> :
      <ReviewModalWithForm cameraId={cameraId} reviewModalStatus={reviewModalOpenedStatus} reviewSentStatus={reviewSentStatus} />
  );
}

export {ReviewModal};

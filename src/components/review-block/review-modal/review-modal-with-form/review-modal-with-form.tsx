import { LoadingStatus } from '../../../../consts/const';
import { useAppDispatch } from '../../../../hooks/hooks';
import { reviewModal } from '../../../../store/slices/product-slice/product-slice';
import { ReviewModalForm } from '../review-modal-form/review-modal-form';

type ReviewModalWithFormProps = {
  cameraId: number,
  reviewModalStatus: boolean,
  reviewSentStatus: LoadingStatus
}

function ReviewModalWithForm ({cameraId, reviewModalStatus, reviewSentStatus}: ReviewModalWithFormProps) {

  const dispatch = useAppDispatch();

  const handleEscButtonClick = () => {
    const onEscButtonClick = (evt: { key: string; }) => {
      if(evt.key === 'Escape') {
        dispatch(reviewModal(false));
      }
    };
    window.addEventListener('keydown', onEscButtonClick);
    return () => window.removeEventListener('keydown', onEscButtonClick);
  };

  handleEscButtonClick();

  return (
    <div className={`modal ${reviewModalStatus ? 'is-active' : ''}`} data-testid="review-modal">
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={() => (dispatch(reviewModal(false)))} data-testid='modal-overlay'></div>
        <div className="modal__content">
          <p className="title title--h4">Оставить отзыв</p>
          <div className="form-review">
            <ReviewModalForm cameraId={cameraId} reviewSentStatus={reviewSentStatus} />
          </div>
          <button className="cross-btn" type="button" aria-label="Закрыть попап" onClick={() => dispatch(reviewModal(false))} data-testid='cross-btn'>
            <svg width="10" height="10" aria-hidden="true">
              <use xlinkHref="#icon-close"></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export {ReviewModalWithForm};

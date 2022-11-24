import { useAppDispatch } from '../../../../hooks/hooks';
import { reviewModalOpenedStatus } from '../../../../store/slices/product-slice/product-slice';


function ReviewModalSuccess():JSX.Element {

  const dispatch = useAppDispatch();

  return (

    <div className='modal is-active modal--narrow' data-testid="review-modal">
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={() => dispatch(reviewModalOpenedStatus(false))} data-testid='modal-overlay'></div>
        <div className="modal__content" data-testid="review-modal-success">
          <p className="title title--h4">Спасибо за отзыв</p>
          <svg className="modal__icon" width="80" height="78" aria-hidden="true">
            <use xlinkHref="#icon-review-success"></use>
          </svg>
          <div className="modal__buttons">
            <button className="btn btn--purple modal__btn modal__btn--fit-width" type="button" onClick={() => dispatch(reviewModalOpenedStatus(false))} data-testid='back-to-button' >Вернуться к покупкам
            </button>
          </div>
          <button className="cross-btn" type="button" aria-label="Закрыть попап" onClick={() => dispatch(reviewModalOpenedStatus(false))} data-testid='cross-btn'>
            <svg width="10" height="10" aria-hidden="true">
              <use xlinkHref="#icon-close"></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export {ReviewModalSuccess};

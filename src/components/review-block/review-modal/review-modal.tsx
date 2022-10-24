import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAppDispatch } from '../../../hooks/hooks';
import { fetchCamerasReviewsAction, postCameraReview } from '../../../store/api-actions';

import { PostReviewType } from '../../../types/server-data-types';


type ReviewModalComponentProps = {
  cameraId: number,
  isOpen: boolean,
  modalStatusHandler: CallableFunction
}


function ReviewModalComponent ({cameraId, isOpen, modalStatusHandler }: ReviewModalComponentProps) {

  const dispatch = useAppDispatch();

  const [isReviewSended, setIsReviewSended] = useState(false);

  const { register, watch, handleSubmit, reset, formState: { errors } } = useForm<PostReviewType>({defaultValues: {rating: 0}});
  const onSubmit: SubmitHandler<PostReviewType> = (data) => {
    data.cameraId = cameraId;
    data.rating = Number(data.rating);
    dispatch(postCameraReview(data));
    setIsReviewSended(true);
    reset();
  };

  const generateModalClass = (): string => {
    if(isOpen) {
      if(isOpen && isReviewSended) {
        return (
          'modal is-active modal--narrow'
        );
      }
      return (
        'modal is-active'
      );
    }
    return (
      'modal'
    );
  };

  const closeAfterSuccessfulRevievSend = () => {
    setIsReviewSended(false);
    dispatch(fetchCamerasReviewsAction(cameraId));
    modalStatusHandler(!isOpen);
  };

  useEffect(() => {
    const onEscButtonClick = (evt: { key: string; }) => {
      if(evt.key === 'Escape') {
        if (isReviewSended === true) {
          closeAfterSuccessfulRevievSend();
        }
        modalStatusHandler(false);
      }
    };
    window.addEventListener('keydown', onEscButtonClick);
    return () => window.removeEventListener('keydown', onEscButtonClick);
  }, [isReviewSended]);

  return (
    <div className={generateModalClass()}>
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={() => (isReviewSended ? closeAfterSuccessfulRevievSend() : modalStatusHandler(false))}></div>
        {!isReviewSended &&
          <div className="modal__content">
            <p className="title title--h4">Оставить отзыв</p>
            <div className="form-review">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-review__rate">
                  <fieldset className="rate form-review__item">
                    <legend className="rate__caption">Рейтинг
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"></use>
                      </svg>
                    </legend>
                    <div className="rate__bar">
                      <div className="rate__group">
                        <input className="visually-hidden" id="star-5" type="radio" value={5} {...register('rating', { required: true })}></input>
                        <label className="rate__label" htmlFor="star-5" title="Отлично"></label>
                        <input className="visually-hidden" id="star-4" type="radio" value={4} {...register('rating', { required: true })}></input>
                        <label className="rate__label" htmlFor="star-4" title="Хорошо"></label>
                        <input className="visually-hidden" id="star-3" type="radio" value={3} {...register('rating', { required: true })}></input>
                        <label className="rate__label" htmlFor="star-3" title="Нормально"></label>
                        <input className="visually-hidden" id="star-2" type="radio" value={2} {...register('rating', { required: true })}></input>
                        <label className="rate__label" htmlFor="star-2" title="Плохо"></label>
                        <input className="visually-hidden" id="star-1" type="radio" value={1} {...register('rating', { required: true })}></input>
                        <label className="rate__label" htmlFor="star-1" title="Ужасно"></label>
                      </div>
                      <div className="rate__progress"><span className="rate__stars">{watch('rating')}</span> <span>/</span> <span className="rate__all-stars">5</span>
                      </div>
                    </div>
                    <p className="rate__message">Нужно оценить товар</p>
                  </fieldset>
                  <div className={errors.userName ? 'custom-input form-review__item is-invalid' : 'custom-input form-review__item'}>
                    <label>
                      <span className="custom-input__label">Ваше имя
                        <svg width="9" height="9" aria-hidden="true">
                          <use xlinkHref="#icon-snowflake"></use>
                        </svg>
                      </span>
                      <p className="custom-input__error">Нужно указать имя</p>
                      <input placeholder="Введите ваше имя" {...register('userName', {
                        required: true
                      })}
                      />
                    </label>
                  </div>

                  <div className={errors.advantage ? 'custom-input form-review__item is-invalid' : 'custom-input form-review__item'}>
                    <label>
                      <span className="custom-input__label">Достоинства
                        <svg width="9" height="9" aria-hidden="true">
                          <use xlinkHref="#icon-snowflake"></use>
                        </svg>
                      </span>
                      <p className="custom-input__error">Нужно указать достоинства</p>
                      <input placeholder="Основные преимущества товара" {...register('advantage', {
                        required: true
                      })}
                      />
                    </label>
                  </div>

                  <div className={errors.disadvantage ? 'custom-input form-review__item is-invalid' : 'custom-input form-review__item'}>
                    <label>
                      <span className="custom-input__label">Недостатки
                        <svg width="9" height="9" aria-hidden="true">
                          <use xlinkHref="#icon-snowflake"></use>
                        </svg>
                      </span>
                      <p className="custom-input__error">Нужно указать недостатки</p>
                      <input placeholder="Главные недостатки товара" {...register('disadvantage', {
                        required: true
                      })}
                      />
                    </label>
                  </div>

                  <div className={errors.review ? 'custom-textarea form-review__item is-invalid' : 'custom-textarea form-review__item'}>
                    <label>
                      <span className="custom-textarea__label">Недостатки
                        <svg width="9" height="9" aria-hidden="true">
                          <use xlinkHref="#icon-snowflake"></use>
                        </svg>
                      </span>
                      <p className="custom-input__error">Нужно указать недостатки</p>
                      <textarea placeholder="Поделитесь своим опытом покупки" {...register('review', {
                        required: true
                      })}
                      />
                    </label>
                  </div>

                </div>
                <button className="btn btn--purple form-review__btn" type="submit">Отправить отзыв</button>
              </form>
            </div>
            <button className="cross-btn" type="button" aria-label="Закрыть попап" onClick={() => modalStatusHandler(!isOpen)}>
              <svg width="10" height="10" aria-hidden="true">
                <use xlinkHref="#icon-close"></use>
              </svg>
            </button>
          </div>}
        {isReviewSended &&
          <div className="modal__content">
            <p className="title title--h4">Спасибо за отзыв</p>
            <svg className="modal__icon" width="80" height="78" aria-hidden="true">
              <use xlinkHref="#icon-review-success"></use>
            </svg>
            <div className="modal__buttons">
              <button className="btn btn--purple modal__btn modal__btn--fit-width" type="button" onClick={() => closeAfterSuccessfulRevievSend()}>Вернуться к покупкам
              </button>
            </div>
            <button className="cross-btn" type="button" aria-label="Закрыть попап" onClick={() => closeAfterSuccessfulRevievSend()}>
              <svg width="10" height="10" aria-hidden="true">
                <use xlinkHref="#icon-close"></use>
              </svg>
            </button>
          </div>}
      </div>
    </div>
  );
}

export {ReviewModalComponent};

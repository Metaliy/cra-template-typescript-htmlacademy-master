import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import { fetchCamerasReviewsAction, postCameraReviewAction } from '../../../../store/api-actions/product-api/product-api';
import { getSelectedCamera } from '../../../../store/cameras-slice/selectors';
import { setReviewModalOpenedStatus } from '../../../../store/product-slice/product-slice';
import { getReviewModalOpenedStatus } from '../../../../store/product-slice/selectors';

import { PostReviewType } from '../../../../types/server-data-types';


function ReviewModalForm () {

  const dispatch = useAppDispatch();

  const cameraId = useAppSelector(getSelectedCamera).id;
  const reviewModalOpenedStatus = useAppSelector(getReviewModalOpenedStatus);


  const { register, watch, handleSubmit, reset, formState: { errors } } = useForm<PostReviewType>({defaultValues: {rating: 0}});
  const onSubmit: SubmitHandler<PostReviewType> = async (data) => {
    data.cameraId = cameraId;
    data.rating = Number(data.rating);
    dispatch(postCameraReviewAction(data));
    dispatch(fetchCamerasReviewsAction(cameraId));
    reset();
  };

  useEffect(() => {
    const onEscButtonClick = (evt: { key: string; }) => {
      if(evt.key === 'Escape') {
        dispatch(setReviewModalOpenedStatus(false));
      }
    };
    window.addEventListener('keydown', onEscButtonClick);
    return () => window.removeEventListener('keydown', onEscButtonClick);
  }, [dispatch]);

  return (
    <div className={`modal ${reviewModalOpenedStatus ? 'is-active' : ''}`} data-testid="review-modal">
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={() => (dispatch(setReviewModalOpenedStatus(false)))} data-testid='modal-overlay'></div>
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
                      <input className="visually-hidden" id="star-3" type="radio" value={3} {...register('rating', { required: true })} data-testid='rate-bar-input-3'></input>
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
                <div className={errors.userName ? 'custom-input form-review__item is-invalid' : 'custom-input form-review__item'} data-testid={errors.userName ? 'input-invalid' : 'initial-input'}>
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

                <div className={errors.advantage ? 'custom-input form-review__item is-invalid' : 'custom-input form-review__item'} data-testid={errors.userName ? 'input-invalid' : 'initial-input'}>
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

                <div className={errors.disadvantage ? 'custom-input form-review__item is-invalid' : 'custom-input form-review__item'} data-testid={errors.userName ? 'input-invalid' : 'initial-input'}>
                  <label>
                    <span className="custom-input__label">недостатки
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

                <div className={errors.review ? 'custom-textarea form-review__item is-invalid' : 'custom-textarea form-review__item'} data-testid={errors.userName ? 'input-invalid' : 'initial-input'}>
                  <label>
                    <span className="custom-textarea__label">Комментарий
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"></use>
                      </svg>
                    </span>
                    <p className="custom-input__error">Нужно добавить комментарий</p>
                    <textarea placeholder="Поделитесь своим опытом покупки" {...register('review', {
                      required: true
                    })}
                    />
                  </label>
                </div>
              </div>
              <button className="btn btn--purple form-review__btn" type="submit" data-testid="submit">Отправить отзыв</button>
            </form>
          </div>
          <button className="cross-btn" type="button" aria-label="Закрыть попап" onClick={() => dispatch(setReviewModalOpenedStatus(false))} data-testid='cross-btn'>
            <svg width="10" height="10" aria-hidden="true">
              <use xlinkHref="#icon-close"></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export {ReviewModalForm};

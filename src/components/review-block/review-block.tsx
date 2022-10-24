import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { VISIBLE_REVIEWS_COUNT } from '../../consts/const';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { fetchCamerasReviewsAction } from '../../store/api-actions';
import { getReviewsList, getReviewsListLoadingStatus } from '../../store/camera-data/selectors';
import { LoaderComponent } from '../loading-screen/loading-screen';
import { ReviewCardComponent } from './review-card/review-card';

type ReviewBlockComponentProps = {
  cameraId?: string,
  modalStatusHandler: CallableFunction,
  isReviewModalOpenStatus: boolean
}

function ReviewBlockComponent({cameraId, modalStatusHandler, isReviewModalOpenStatus}:ReviewBlockComponentProps):JSX.Element {

  const [visibleReviewCount, onSetVisibleReviewCount] = useState(VISIBLE_REVIEWS_COUNT);

  const dispatch = useAppDispatch();

  const isReviewsListLoading = useAppSelector(getReviewsListLoadingStatus);

  const reviewsList = useAppSelector(getReviewsList);

  useEffect(() => {
    dispatch(fetchCamerasReviewsAction(Number(cameraId)));
  }, [dispatch, cameraId]);

  const sortedByDateReviewsList = reviewsList.slice().sort((a, b) => (dayjs(a.createAt).isAfter(dayjs(b.createAt)) ? -1 : 1));

  if(isReviewsListLoading) {
    return (
      <LoaderComponent />
    );
  }

  return (
    <section className="review-block">
      <div className="container">
        <div className="page-content__headed">
          <h2 className="title title--h3">Отзывы</h2>
          <button className="btn" type="button" onClick={() => modalStatusHandler(!isReviewModalOpenStatus)}>Оставить свой отзыв</button>
        </div>
        <ul className="review-block__list">
          {sortedByDateReviewsList.slice(0, visibleReviewCount).map((review) => (
            <ReviewCardComponent reviewItem={review} key={review.id} />
          ))}
        </ul>
        <div className={visibleReviewCount >= sortedByDateReviewsList.length ? 'visually-hidden' : 'review-block__buttons'}>
          <button className="btn btn--purple" type="button" onClick={ () =>onSetVisibleReviewCount(visibleReviewCount + VISIBLE_REVIEWS_COUNT)}>Показать больше отзывов
          </button>
        </div>
      </div>
    </section>
  );
}

export {ReviewBlockComponent};

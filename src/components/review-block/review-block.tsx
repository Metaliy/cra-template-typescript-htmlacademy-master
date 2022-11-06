import dayjs from 'dayjs';
import { useState } from 'react';
import { VISIBLE_REVIEWS_COUNT } from '../../consts/const';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { setReviewModalOpenedStatus } from '../../store/product-slice/product-slice';
import { getReviewsList } from '../../store/reviews-slice/selectors';


import { ReviewCard } from './review-card/review-card';

function ReviewBlock():JSX.Element {

  const [visibleReviewCount, onSetVisibleReviewCount] = useState(VISIBLE_REVIEWS_COUNT);


  const reviewsList = useAppSelector(getReviewsList);

  const sortedByDateReviewsList = reviewsList.slice().sort((a, b) => (dayjs(a.createAt).isAfter(dayjs(b.createAt)) ? -1 : 1));

  const dispatch = useAppDispatch();


  return (
    <section className="review-block" data-testid="review-block">
      <div className="container">
        <div className="page-content__headed">
          <h2 className="title title--h3">Отзывы</h2>
          <button className="btn" type="button" onClick={() => dispatch(setReviewModalOpenedStatus(true))} data-testid="modal-open-button">Оставить свой отзыв</button>
        </div>
        <ul className="review-block__list">
          {sortedByDateReviewsList.slice(0, visibleReviewCount).map((review) => (
            <ReviewCard reviewItem={review} key={review.id} />
          ))}
        </ul>
        <div className={visibleReviewCount >= sortedByDateReviewsList.length ? 'visually-hidden' : 'review-block__buttons'}>
          <button className="btn btn--purple" type="button" onClick={ () =>onSetVisibleReviewCount(visibleReviewCount + VISIBLE_REVIEWS_COUNT)} data-testid="show-more-reviews-button">Показать больше отзывов
          </button>
        </div>
      </div>
    </section>
  );
}

export {ReviewBlock};

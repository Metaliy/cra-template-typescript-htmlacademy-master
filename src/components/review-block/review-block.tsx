import dayjs from 'dayjs';
import { useState } from 'react';
import { VISIBLE_REVIEWS_COUNT } from '../../consts/const';
import { useAppDispatch } from '../../hooks/hooks';
import { reviewModalOpenedStatus } from '../../store/product-slice/product-slice';
import { ReviewType } from '../../types/server-data-types';
import { ReviewCard } from './review-card/review-card';

type ReviewBlockProps = {
  reviewsList: ReviewType[]
}

function ReviewBlock({reviewsList}: ReviewBlockProps):JSX.Element {

  const [visibleReviewCount, onSetVisibleReviewCount] = useState(VISIBLE_REVIEWS_COUNT);

  const sortedByDateReviewsList = reviewsList.slice().sort((a, b) => (dayjs(a.createAt).isAfter(dayjs(b.createAt)) ? -1 : 1));

  const dispatch = useAppDispatch();


  return (
    <section className="review-block" data-testid="review-block">
      <div className="container">
        <div className="page-content__headed">
          <h2 className="title title--h3">Отзывы</h2>
          <button className="btn" type="button" onClick={() => dispatch(reviewModalOpenedStatus(true))} data-testid="modal-open-button">Оставить свой отзыв</button>
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

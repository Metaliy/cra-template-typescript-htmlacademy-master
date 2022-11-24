import dayjs from 'dayjs';
import { ReviewType } from '../../../types/server-data-types';
import 'dayjs/locale/ru';
import { MAX_RATING } from '../../../consts/const';
import { ReviewRating } from '../../rating/review-rating/review-rating';

require('dayjs/locale/ru');
dayjs().locale('ru').format();

type ReviewCardProps = {
  reviewItem: ReviewType
}

function ReviewCard ({reviewItem}:ReviewCardProps) {
  const {advantage, disadvantage, review, rating, userName, createAt, id} = reviewItem;
  return (
    <li className="review-card" data-testid={`review-card-${id}`}>
      <div className="review-card__head">
        <p className="title title--h4">{userName}</p>
        <time className="review-card__data" dateTime={createAt}>{dayjs(createAt).locale('ru').format('D MMMM')}</time>
      </div>
      <ReviewRating maxRating={MAX_RATING} rating={rating} />
      <ul className="review-card__list">
        <li className="item-list"><span className="item-list__title">Достоинства:</span>
          <p className="item-list__text">{advantage}</p>
        </li>
        <li className="item-list"><span className="item-list__title">Недостатки:</span>
          <p className="item-list__text">{disadvantage}</p>
        </li>
        <li className="item-list"><span className="item-list__title">Комментарий:</span>
          <p className="item-list__text">{review}</p>
        </li>
      </ul>
    </li>
  );
}
export {ReviewCard};

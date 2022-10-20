import dayjs from 'dayjs';
import { ReviewType } from '../../../types/server-data-types';
import { RatingComponent } from '../../rating/rating';

import 'dayjs/locale/ru';

require('dayjs/locale/ru');
dayjs().locale('ru').format();

type ReviewCardComponentProps = {
  reviewItem: ReviewType
}

function ReviewCardComponent ({reviewItem}:ReviewCardComponentProps) {
  const {advantage, disadvantage, review, rating, userName, createAt} = reviewItem;
  return (
    <li className="review-card">
      <div className="review-card__head">
        <p className="title title--h4">{userName}</p>
        <time className="review-card__data" dateTime={createAt}>{dayjs(createAt).locale('ru').format('D MMMM')}</time>
      </div>
      <RatingComponent maxRating={5} rating={rating} isReview />
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
export {ReviewCardComponent};

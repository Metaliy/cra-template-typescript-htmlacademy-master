import { Stars } from '../stars/stars';

type RatingProps ={
  maxRating: number,
  rating: number
}

function ReviewRating({ maxRating, rating}: RatingProps):JSX.Element {

  return (
    <div className="rate review-card__rate" data-testid="review-card-rating">
      <Stars rating={rating} maxRating={maxRating} />
      <p className="visually-hidden">Оценка: {rating}</p>
    </div>
  );


}

export {ReviewRating};

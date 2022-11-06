import { Stars } from '../stars/stars';

type RatingProps ={
  maxRating: number,
  rating: number,
  reviewCount: number,
}

function ProductRating({ maxRating, rating, reviewCount}: RatingProps):JSX.Element {

  return (
    <div className="rate product-card__rate" data-testid="product-card-rating">
      <Stars rating={rating} maxRating={maxRating} />
      <p className="visually-hidden">Рейтинг: {rating}</p>
      <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{reviewCount}</p>
    </div>
  );
}

export {ProductRating};

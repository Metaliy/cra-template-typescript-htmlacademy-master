
type RatingComponentProps ={
  maxRating: number,
  rating: number,
  reviewCount?: number,
  isReview?: boolean
}

function RatingComponent({ maxRating, rating, reviewCount, isReview}: RatingComponentProps):JSX.Element {
  const stars = [];
  let starId = 1;
  for (let i = 0; i < rating; i++) {
    stars.push(
      <svg width="17" height="16" aria-hidden="true" key={starId}>
        <use xlinkHref="#icon-full-star"></use>
      </svg>
    );
    starId++;
  }

  for (let i = 0; i < maxRating - rating; i++) {
    stars.push(
      <svg width="17" height="16" aria-hidden="true" key={starId}>
        <use xlinkHref="#icon-star"></use>
      </svg>
    );
    starId++;
  }

  if (isReview) {
    return (
      <div className="rate review-card__rate">
        {stars}
        <p className="visually-hidden">Оценка: {rating}</p>
      </div>
    );
  }
  return (
    <div className="rate product-card__rate">
      {stars}
      <p className="visually-hidden">Рейтинг: {rating}</p>
      <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{reviewCount}</p>
    </div>
  );
}

export {RatingComponent};

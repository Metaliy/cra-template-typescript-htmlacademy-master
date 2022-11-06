import React from 'react';

type StarsProps ={
  maxRating: number,
  rating: number,
}

function Stars({ maxRating, rating}: StarsProps):JSX.Element {
  const stars = [];

  for (let i = 0; i < maxRating; i++) {
    stars.push(
      i < rating
    );
  }
  let starId = 0;
  return (
    <>
      {
        stars.map ((star) => {
          starId++;
          return (
            <svg width="17" height="16" aria-hidden="true" key={starId}>
              <use xlinkHref={ star ? '#icon-full-star' : '#icon-star' }></use>
            </svg>
          );
        }
        )
      }
    </>
  );
}

export {Stars};

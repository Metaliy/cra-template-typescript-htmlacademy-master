import { useState } from 'react';
import { VISIBLE_CARD_COUNT } from '../../consts/const';
import { CameraType } from '../../types/server-data-types';
import { ProductCard } from '../product-card/product-card';

type ProductSimilarSliderProps = {
  similarCamerasList: CameraType[],
  camerasIdInTheBasket: number[]
}

function ProductSimilarSlider ({similarCamerasList, camerasIdInTheBasket}: ProductSimilarSliderProps) {

  const [visibleCardStartIndex, setVisibleCardIndex] = useState(0);


  const visibleCardEndIndex = visibleCardStartIndex + VISIBLE_CARD_COUNT;


  return (
    <div className="page-content__section" data-testid="product-similar-slider">
      <section className="product-similar">
        <div className="container"></div>
        <h2 className="title title--h3">Похожие товары</h2>
        <div className="product-similar__slider">
          <div className="product-similar__slider-list">
            {similarCamerasList.slice(visibleCardStartIndex, visibleCardEndIndex).map((camera) => (
              <ProductCard camera={camera} key={camera.id} isActive isAdded={camerasIdInTheBasket.includes(camera.id)} />
            ))}
          </div>
          <button className="slider-controls slider-controls--prev" type="button" aria-label="Предыдущий слайд" data-testid="prev-button" onClick={() => setVisibleCardIndex(visibleCardStartIndex - VISIBLE_CARD_COUNT)} disabled={visibleCardStartIndex === 0}>
            <svg width="7" height="12" aria-hidden="true">
              <use xlinkHref="#icon-arrow"></use>
            </svg>
          </button>
          <button className="slider-controls slider-controls--next" type="button" aria-label="Следующий слайд" data-testid="next-button" onClick={() => setVisibleCardIndex(visibleCardStartIndex + VISIBLE_CARD_COUNT)} disabled={visibleCardEndIndex >= similarCamerasList.length}>
            <svg width="7" height="12" aria-hidden="true">
              <use xlinkHref="#icon-arrow"></use>
            </svg>
          </button>
        </div>
      </section>
    </div>
  );
}

export {ProductSimilarSlider};

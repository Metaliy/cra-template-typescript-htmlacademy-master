import { useState } from 'react';
import { VISIBLE_CARD_COUNT } from '../../consts/const';
import { useAppSelector } from '../../hooks/hooks';
import { getSimilarCameras } from '../../store/product-data/selectors';
import { ProductCardComponent } from '../product-card/product-card';

function ProductSimilarSliderComponent () {

  const [visibleCardStartIndex, setVisibleCardIndex] = useState(0);

  const similarCamerasList = useAppSelector(getSimilarCameras);

  const visibleCardEndIndex = visibleCardStartIndex + VISIBLE_CARD_COUNT;


  return (
    <div className="page-content__section" data-testid="product-similar-slider">
      <section className="product-similar">
        <div className="container"></div>
        <h2 className="title title--h3">Похожие товары</h2>
        <div className="product-similar__slider">
          <div className="product-similar__slider-list">
            {similarCamerasList.slice(visibleCardStartIndex, visibleCardEndIndex).map((camera) => (
              <ProductCardComponent camera={camera} key={camera.id} isActive />
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

export {ProductSimilarSliderComponent};

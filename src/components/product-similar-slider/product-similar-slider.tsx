import { useEffect, useState } from 'react';
import { VISIBLE_CARD_COUNT } from '../../consts/const';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { fetchSimilarCamerasAction } from '../../store/api-actions';
import { getSimilarCameras, getSimilarCamerasListLoadingStatus } from '../../store/camera-data/selectors';
import { LoaderComponent } from '../loading-screen/loading-screen';
import { ProductCardComponent } from '../product-card/product-card';

type ProductSimilarSliderProps = {
  cameraId: number
}

function ProductSimilarSlider ({cameraId}:ProductSimilarSliderProps) {

  const [visibleCardStartIndex, setVisibleCardIndex] = useState(0);

  const dispatch = useAppDispatch();

  const isSimilarCamerasListLoading = useAppSelector(getSimilarCamerasListLoadingStatus);

  useEffect(() => {
    dispatch(fetchSimilarCamerasAction(cameraId));
  }, [dispatch, cameraId]);

  const similarCamerasList = useAppSelector(getSimilarCameras);

  const visibleCardEndIndex = visibleCardStartIndex + VISIBLE_CARD_COUNT;

  if (!similarCamerasList) {
    return (null);
  }

  if(isSimilarCamerasListLoading) {
    return (
      <LoaderComponent />
    );
  }

  return (
    <div className="page-content__section">
      <section className="product-similar">
        <div className="container"></div>
        <h2 className="title title--h3">Похожие товары</h2>
        <div className="product-similar__slider">
          <div className="product-similar__slider-list">
            {similarCamerasList.slice(visibleCardStartIndex, visibleCardEndIndex).map((camera) => (
              <ProductCardComponent camera={camera} key={camera.id} isActive />
            ))}
          </div>
          <button className="slider-controls slider-controls--prev" type="button" aria-label="Предыдущий слайд" onClick={() => setVisibleCardIndex(visibleCardStartIndex - VISIBLE_CARD_COUNT)} disabled={visibleCardStartIndex === 0}>
            <svg width="7" height="12" aria-hidden="true">
              <use xlinkHref="#icon-arrow"></use>
            </svg>
          </button>
          <button className="slider-controls slider-controls--next" type="button" aria-label="Следующий слайд" onClick={() => setVisibleCardIndex(visibleCardStartIndex + VISIBLE_CARD_COUNT)} disabled={visibleCardEndIndex >= similarCamerasList.length}>
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

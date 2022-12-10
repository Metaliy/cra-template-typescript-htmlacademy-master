import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/hooks';
import { removedItemConfirm } from '../../store/slices/basket-slice/basket-slice';
import { CameraType } from '../../types/server-data-types';

type BasketRemoveModalProps = {
  camera: CameraType,
  setRemoveCameraModalOpenStatusHandler: CallableFunction
}

export function BasketRemoveModal({camera, setRemoveCameraModalOpenStatusHandler}:BasketRemoveModalProps):JSX.Element {

  const dispatch = useAppDispatch();

  return (
    <div className="modal is-active">
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={() => setRemoveCameraModalOpenStatusHandler(false)}></div>
        <div className="modal__content">
          <p className="title title--h4">Удалить этот товар?</p>
          <div className="basket-item basket-item--short">
            <div className="basket-item__img">
              <picture>
                <source type="image/webp" srcSet={`../${camera.previewImgWebp}, ../${camera.previewImgWebp2x} 2x`}></source>
                <img src={`../${camera.previewImg}`} srcSet={`../${camera.previewImg2x}`} width="140" height="120" alt={camera.name}></img>
              </picture>
            </div>
            <div className="basket-item__description">
              <p className="basket-item__title">{camera.name}</p>
              <ul className="basket-item__list">
                <li className="basket-item__list-item"><span className="basket-item__article">Артикул:</span> <span className="basket-item__number">{camera.vendorCode}</span>
                </li>
                <li className="basket-item__list-item">{camera.category}</li>
                <li className="basket-item__list-item">{camera.level}</li>
              </ul>
            </div>
          </div>
          <div className="modal__buttons">
            <button className="btn btn--purple modal__btn modal__btn--half-width" type="button" onClick={() => {
              dispatch(removedItemConfirm(camera.id));
              setRemoveCameraModalOpenStatusHandler(false);
            }}
            >Удалить
            </button>
            <Link className="btn btn--transparent modal__btn modal__btn--half-width" to='' onClick={() => setRemoveCameraModalOpenStatusHandler(false)}>Продолжить покупки
            </Link>
          </div>
          <button className="cross-btn" type="button" aria-label="Закрыть попап" onClick={() => setRemoveCameraModalOpenStatusHandler(false)}>
            <svg width="10" height="10" aria-hidden="true">
              <use xlinkHref="#icon-close"></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

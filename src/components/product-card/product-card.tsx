import { generatePath, Link } from 'react-router-dom';
import { AppRoute, MAX_RATING } from '../../consts/const';
import { CameraType } from '../../types/server-data-types';
import { getPriceWitchSpaces } from '../../utils/utils';
import { RatingComponent } from '../rating/rating';

type ProductCardComponentPropsType = {
  camera: CameraType,
  isActive?: boolean
}

function ProductCardComponent ({camera, isActive}:ProductCardComponentPropsType):JSX.Element {
  const {id, name, price, rating, reviewCount, previewImg, previewImgWebp, previewImgWebp2x, previewImg2x} = camera;

  return (
    <div className={isActive ? 'product-card is-active' : 'product-card'}>
      <div className="product-card__img">
        <picture>
          <source type="image/webp" srcSet={`../${previewImgWebp}, ../${previewImgWebp2x} 2x`}></source>
          <img src={`../${previewImg}`} srcSet={`../${previewImg2x}`} width="280" height="240" alt={name}></img>
        </picture>
      </div>
      <div className="product-card__info">
        <RatingComponent maxRating={MAX_RATING} rating={rating} reviewCount={reviewCount} />

        <p className="product-card__title">
          {name}
        </p>
        <p className="product-card__price">
          <span className="visually-hidden">Цена:</span>{getPriceWitchSpaces(price)} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        <button className="btn btn--purple product-card__btn" type="button">Купить
        </button>
        <Link className="btn btn--transparent" to={generatePath(AppRoute.Product, {id: String(id)})}>Подробнее
        </Link>
      </div>
    </div>
  );
}

export {ProductCardComponent};

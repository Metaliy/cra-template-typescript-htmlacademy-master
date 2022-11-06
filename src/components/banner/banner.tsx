import { generatePath, Link } from 'react-router-dom';
import { AppRoute } from '../../consts/const';
import { useAppSelector } from '../../hooks/hooks';
import { getPromoCamera } from '../../store/promo-slice/selectors';


function Banner () {

  const {name, previewImg, previewImg2x, previewImgWebp, previewImgWebp2x, id} = useAppSelector(getPromoCamera);


  return (
    <div className="banner" data-testid="banner">
      <picture>
        <source type="image/webp" srcSet={`../${previewImgWebp}, ../${previewImgWebp2x} 2x`}></source>
        <img src={`../${previewImg}`} srcSet={`../${previewImg2x}`} width="1280" height="280" alt="баннер"></img>
      </picture>
      <p className="banner__info">
        <span className="banner__message">Новинка!</span>
        <span className="title title--h1">{name}</span>
        <span className="banner__text">Профессиональная камера от&nbsp;известного производителя</span>
        <Link className="btn" to={generatePath(AppRoute.Product, {id: String(id)})}>Подробнее</Link>
      </p>
    </div>
  );
}

export {Banner};

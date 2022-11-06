import { CameraType } from '../../types/server-data-types';
import { ProductCard } from '../product-card/product-card';

type ProductCardListProps = {
  camerasList: CameraType[]
}

function ProductCardList ({camerasList}:ProductCardListProps) {


  return (
    <div className="cards catalog__cards" data-testid="product-card-list">
      {camerasList.map((camera) => (
        <ProductCard camera={camera} key={camera.id} />
      ))}
    </div>
  );
}

export {ProductCardList};

import { CameraType } from '../../types/server-data-types';
import { ProductCardComponent } from '../product-card/product-card';

type ProductCardListComponentProps = {
  camerasList: CameraType[]
}

function ProductCardListComponent ({camerasList}:ProductCardListComponentProps) {


  return (
    <div className="cards catalog__cards" data-testid="product-card-list">
      {camerasList.map((camera) => (
        <ProductCardComponent camera={camera} key={camera.id} />
      ))}
    </div>
  );
}

export {ProductCardListComponent};

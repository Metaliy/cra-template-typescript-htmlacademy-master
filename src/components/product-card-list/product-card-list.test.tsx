import { renderFakeApp } from '../../mock/fake-app/fake-app';
import { ProductCardList } from './product-card-list';
import { screen } from '@testing-library/react';
import { getUidCamerasList } from '../../mock/mock';

const fakeCamerasList = getUidCamerasList(4);
const camerasId = [1,2,3,4];

describe('product card list component', () => {
  it('should render correctly', () => {
    renderFakeApp(<ProductCardList camerasList={fakeCamerasList} camerasIdInTheBasket={camerasId} />, {});

    expect(screen.getByTestId('product-card-list')).toBeInTheDocument();
    expect(screen.getByText(fakeCamerasList[0].name)).toBeInTheDocument();
  });

});

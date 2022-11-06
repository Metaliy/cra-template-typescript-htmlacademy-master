import { renderFakeApp } from '../../mock/fake-app/fake-app';
import { ProductCardList } from './product-card-list';
import { screen } from '@testing-library/react';
import { getFakeCamera } from '../../mock/mock';

const fakeCamerasList = [getFakeCamera()];

describe('product card list ', () => {
  it('should render correctly', () => {
    renderFakeApp(<ProductCardList camerasList={fakeCamerasList} />, {});

    expect(screen.getByTestId('product-card-list')).toBeInTheDocument();
    expect(screen.getByText(fakeCamerasList[0].name)).toBeInTheDocument();
  });

});

import { renderFakeApp } from '../../mock/fake-app/fake-app';
import { ProductCardListComponent } from './product-card-list';
import { screen } from '@testing-library/react';
import { getFakeCamera } from '../../mock/mock';

const fakeCamerasList = [getFakeCamera()];

describe('product card list Component', () => {
  it('should render correctly', () => {
    renderFakeApp(<ProductCardListComponent camerasList={fakeCamerasList} />, {});

    expect(screen.getByTestId('product-card-list')).toBeInTheDocument();
    expect(screen.getByText(fakeCamerasList[0].name)).toBeInTheDocument();
  });

});

import { screen } from '@testing-library/react';
import { renderFakeApp } from '../../../mock/fake-app/fake-app';
import { getFakeCamera } from '../../../mock/mock';
import { ProductRating } from './product-rating';


const fakeCamera = getFakeCamera();
const fakeMaxStarRating = 5;


describe('product rating component', () => {
  it('should render "Product card rating component"', () => {
    renderFakeApp(<ProductRating rating={fakeCamera.rating} maxRating={fakeMaxStarRating} reviewCount={fakeCamera.reviewCount} />, {});

    expect(screen.getByTestId('product-card-rating')).toBeInTheDocument();
    expect(screen.getByText(`Рейтинг: ${fakeCamera.rating}`)).toBeInTheDocument();
    expect(screen.getByText(`${fakeCamera.reviewCount}`)).toBeInTheDocument();
  });
});

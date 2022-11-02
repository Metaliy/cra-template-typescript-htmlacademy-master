import { screen } from '@testing-library/react';
import { renderFakeApp } from '../../mock/fake-app/fake-app';
import { getFakeCamera } from '../../mock/mock';
import { RatingComponent } from './rating';

const fakeCamera = getFakeCamera();
const fakeMaxStarRating = 5;


describe('Rating component', () => {
  it('should render "Product card rating component"', () => {
    renderFakeApp(<RatingComponent rating={fakeCamera.rating} maxRating={fakeMaxStarRating} reviewCount={fakeCamera.reviewCount} />, {});

    expect(screen.getByTestId('product-card-rating')).toBeInTheDocument();
    expect(screen.getByText(`Рейтинг: ${fakeCamera.rating}`)).toBeInTheDocument();
    expect(screen.getByText(`${fakeCamera.reviewCount}`)).toBeInTheDocument();
  });
  it('should render "Review card rating component"', () => {
    renderFakeApp(<RatingComponent rating={fakeCamera.rating} maxRating={fakeMaxStarRating} isReview />, {});

    expect(screen.getByTestId('review-card-rating')).toBeInTheDocument();
    expect(screen.getByText(`Оценка: ${fakeCamera.rating}`)).toBeInTheDocument();
  });
});

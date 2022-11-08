import { screen } from '@testing-library/react';
import { renderFakeApp } from '../../../mock/fake-app/fake-app';
import { getFakeCamera } from '../../../mock/mock';
import { ReviewRating } from './review-rating';


const fakeCamera = getFakeCamera();
const fakeMaxStarRating = 5;


describe('review rating component', () => {
  it('should render "Review card rating component"', () => {
    renderFakeApp(<ReviewRating rating={fakeCamera.rating} maxRating={fakeMaxStarRating} />, {});

    expect(screen.getByTestId('review-card-rating')).toBeInTheDocument();
    expect(screen.getByText(`Оценка: ${fakeCamera.rating}`)).toBeInTheDocument();
  });
});

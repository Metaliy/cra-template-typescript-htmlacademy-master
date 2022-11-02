import { screen } from '@testing-library/react';
import { getFakeCamerasReview } from '../../../mock/mock';
import { renderFakeApp } from '../../../mock/fake-app/fake-app';
import { ReviewCardComponent } from './review-card';

const fakeReview = getFakeCamerasReview();


describe('Review card component', () => {
  it('should render "Review card component"', () => {
    renderFakeApp(<ReviewCardComponent reviewItem={fakeReview}/>, {});

    expect(screen.getByTestId(`review-card-${fakeReview.id}`)).toBeInTheDocument();
    expect(screen.getByText(fakeReview.userName)).toBeInTheDocument();
  });
});

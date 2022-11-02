import { screen } from '@testing-library/react';
import { renderFakeApp } from '../../mock/fake-app/fake-app';
import { NotFoundPage } from './not-found';


describe('Review card component', () => {
  it('should render "Review card component"', () => {
    renderFakeApp(<NotFoundPage/>, {
      initialRoute: 'invalid-route'
    });

    expect(screen.getByTestId('not-found')).toBeInTheDocument();
  });
});

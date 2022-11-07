import { screen } from '@testing-library/react';
import { renderFakeApp } from '../../mock/fake-app/fake-app';
import { NotFoundPage } from './not-found';


describe('Not found page', () => {
  it('should render "Review card component', () => {
    renderFakeApp(<NotFoundPage/>, {});

    expect(screen.getByTestId('not-found')).toBeInTheDocument();
  });
});

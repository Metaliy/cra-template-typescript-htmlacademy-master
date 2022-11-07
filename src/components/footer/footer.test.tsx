import { Footer } from './footer';
import { screen } from '@testing-library/react';
import { renderFakeApp } from '../../mock/fake-app/fake-app';

describe('Footer component', () => {
  it('should render "Footer component"', () => {
    renderFakeApp(<Footer />, {});

    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });
});

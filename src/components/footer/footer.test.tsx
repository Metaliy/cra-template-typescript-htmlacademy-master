import { FooterComponent } from './footer';
import { screen } from '@testing-library/react';
import { renderFakeApp } from '../../mock/fake-app/fake-app';

describe('Footer Component', () => {
  it('should render "Footer component"', () => {
    renderFakeApp(<FooterComponent />, {});

    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });
});

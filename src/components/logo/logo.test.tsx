import { screen } from '@testing-library/react';
import { renderFakeApp } from '../../mock/fake-app/fake-app';
import { Logo } from './logo';


describe('Logo component', () => {
  it('should render "Logo component"', () => {
    renderFakeApp(<Logo />, {});

    expect(screen.getByTestId('logo-component')).toBeInTheDocument();
  });
});

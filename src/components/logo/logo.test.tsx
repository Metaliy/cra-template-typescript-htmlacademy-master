import { screen } from '@testing-library/react';
import { renderFakeApp } from '../../mock/fake-app/fake-app';
import { LogoComponent } from './logo';


describe('Logo component', () => {
  it('should render "Logo component"', () => {
    renderFakeApp(<LogoComponent />, {});

    expect(screen.getByTestId('logo-component')).toBeInTheDocument();
  });
});

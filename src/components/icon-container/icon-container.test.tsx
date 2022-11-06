import { screen } from '@testing-library/react';
import { renderFakeApp } from '../../mock/fake-app/fake-app';
import { IconContainer } from './icon-container';


describe('Icon container component', () => {
  it('should render "Icon container component"', () => {
    renderFakeApp(<IconContainer />, {});

    expect(screen.getByTestId('icon-container')).toBeInTheDocument();
  });
});

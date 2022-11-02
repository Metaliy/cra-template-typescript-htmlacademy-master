import { screen } from '@testing-library/react';
import { renderFakeApp } from '../../mock/fake-app/fake-app';
import { IconContainerComponent } from './icon-container';


describe('Icon container component', () => {
  it('should render "Icon container component"', () => {
    renderFakeApp(<IconContainerComponent />, {});

    expect(screen.getByTestId('icon-container')).toBeInTheDocument();
  });
});

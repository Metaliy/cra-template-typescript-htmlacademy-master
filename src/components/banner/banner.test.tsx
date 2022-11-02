import { renderFakeApp } from '../../mock/fake-app/fake-app';
import { getFakePromoCamera } from '../../mock/mock';
import { BannerComponent } from './banner';
import { screen } from '@testing-library/react';
import { NameSpace } from '../../consts/const';

export const fakePromoCamera = getFakePromoCamera();

const mockState = {
  [NameSpace.CatalogData]: {
    promoCamera: fakePromoCamera
  }

};


describe('Banner Component', () => {
  it('should render correctly', () => {
    renderFakeApp(<BannerComponent />, {
      initialState: mockState
    });

    expect(screen.getByTestId('banner')).toBeInTheDocument();
  });

});

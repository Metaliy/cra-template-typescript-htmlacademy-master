import { renderFakeApp } from '../../mock/fake-app/fake-app';
import { getFakePromoCamera } from '../../mock/mock';
import { Banner } from './banner';
import { screen } from '@testing-library/react';
import { NameSpace } from '../../consts/const';

export const fakePromoCamera = getFakePromoCamera();

const mockState = {
  [NameSpace.Promo]: {
    promoCamera: fakePromoCamera
  }

};


describe('Banner ', () => {
  it('should render correctly', () => {
    renderFakeApp(<Banner />, {
      initialState: mockState
    });

    expect(screen.getByTestId('banner')).toBeInTheDocument();
  });

});

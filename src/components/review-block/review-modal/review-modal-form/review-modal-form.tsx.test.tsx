import { screen } from '@testing-library/react';
import { renderFakeApp } from '../../../../mock/fake-app/fake-app';
import { LoadingStatus, NameSpace } from '../../../../consts/const';
import { ReviewModalForm } from './review-modal-form';


const mockState = {
  [NameSpace.Product]: {
    reviewModalOpenedStatus: true,
  },
  [NameSpace.Reviews]: {
    reviewSentStatus: LoadingStatus.Fulfilled,
  },

};

describe('Review modal form component', () => {
  it('should render "Review modal form component"', () => {
    renderFakeApp(<ReviewModalForm cameraId={1} reviewSentStatus={LoadingStatus.Fulfilled} />, {
      initialState: mockState
    });

    expect(screen.getByTestId('review-modal-form')).toBeInTheDocument();
  });
});

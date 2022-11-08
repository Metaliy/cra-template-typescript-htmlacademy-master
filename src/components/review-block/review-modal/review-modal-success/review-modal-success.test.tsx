import { screen } from '@testing-library/react';
import { renderFakeApp } from '../../../../mock/fake-app/fake-app';
import { ReviewModalSuccess } from './review-modal-success';
import userEvent from '@testing-library/user-event';
import { LoadingStatus, NameSpace } from '../../../../consts/const';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { createAPI } from '../../../../services/api';


const mockState = {
  [NameSpace.Product]: {
    reviewModalOpenedStatus: true,
  },
  [NameSpace.Reviews]: {
    reviewSentStatus: LoadingStatus.Fulfilled,
  },

};

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  [NameSpace.Product]: {
    reviewModalOpenedStatus: true
  },
});


describe('Review modal success component', () => {
  it('should render "Review modal success component"', () => {
    renderFakeApp(<ReviewModalSuccess/>, {
      initialState: mockState
    });

    expect(screen.getByTestId('review-modal-success')).toBeInTheDocument();
  });

  it('should close review modal if user clicks on cross-btn', async () => {
    renderFakeApp(<ReviewModalSuccess/>, {
      mockStore: store
    });

    await userEvent.click(screen.getByTestId('cross-btn'));
    const [action] = store.getActions();
    expect(action.type).toBe('Product/reviewModalOpenedStatus');
  });

  it('should close review modal if user clicks on back-to-button', async () => {
    renderFakeApp(<ReviewModalSuccess />, {
      mockStore: store
    });

    await userEvent.click(screen.getByTestId('back-to-button'));
    const [action] = store.getActions();
    expect(action.type).toBe('Product/reviewModalOpenedStatus');
  });

  it('should close review modal if user clicks on modal-overlay', async () => {
    renderFakeApp(<ReviewModalSuccess />, {
      mockStore: store
    });

    await userEvent.click(screen.getByTestId('modal-overlay'));
    const [action] = store.getActions();
    expect(action.type).toBe('Product/reviewModalOpenedStatus');
  });
});

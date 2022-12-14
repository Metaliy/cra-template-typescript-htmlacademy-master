import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { LoadingStatus, NameSpace } from '../../consts/const';
import { renderFakeApp } from '../../mock/fake-app/fake-app';
import { fakeReviewList, getFakeCamera, getFakeCamerasReview } from '../../mock/mock';
import { createAPI } from '../../services/api';
import { AddItemModal } from './add-item-modal';

const fakeCamera = getFakeCamera();

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  [NameSpace.Reviews]: {
    reviewSentStatus: LoadingStatus.Initial,
    reviewsList: fakeReviewList,
    reviewsListLoadingStatus: LoadingStatus.Initial,
  },
  [NameSpace.Cameras]: {
    selectedCamera: getFakeCamerasReview().id
  },
  [NameSpace.Product]: {
    reviewModalOpenedStatus: false
  },
});


describe('AddItemModal component', () => {
  it('should render AddItemModal', () => {
    renderFakeApp(<AddItemModal addedCamera={fakeCamera} />, {
      mockStore: store
    });
  });

  it('should render AddItemModal and is catalog', async () => {
    renderFakeApp(<AddItemModal addedCamera={fakeCamera} isCatalog/>, {
      mockStore: store
    });
  });


});

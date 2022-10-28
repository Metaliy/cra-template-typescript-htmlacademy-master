import faker from 'faker';
import { CameraType, PromoCameraType, ReviewType } from '../types/server-data-types';

window.scrollTo = jest.fn();

export const getFakeCamera = (): CameraType => ({
  id: faker.datatype.number({min: 1, max: 20}),
  name: faker.name.title(),
  vendorCode: faker.datatype.string(),
  type: faker.datatype.string(),
  category: faker.datatype.string(),
  description: faker.datatype.string(),
  level: faker.datatype.string(),
  rating: faker.datatype.number({min: 0, max: 5}),
  price: faker.datatype.number(),
  previewImg: faker.datatype.string(),
  previewImg2x: faker.datatype.string(),
  previewImgWebp: faker.datatype.string(),
  previewImgWebp2x: faker.datatype.string(),
  reviewCount: faker.datatype.number()
});

export const getFakePromoCamera = () : PromoCameraType => ({
  id: faker.datatype.number(),
  name: faker.datatype.string(),
  previewImg: faker.datatype.string(),
  previewImg2x: faker.datatype.string(),
  previewImgWebp: faker.datatype.string(),
  previewImgWebp2x: faker.datatype.string(),
});

export const getFakeCamerasReview = (): ReviewType => ({
  id: faker.datatype.string(),
  userName: faker.datatype.string(),
  advantage: faker.datatype.string(),
  disadvantage: faker.datatype.string(),
  review: faker.datatype.string(),
  rating: faker.datatype.number(),
  createAt: faker.datatype.string(),
  cameraId: faker.datatype.number(),
});

export const fakeCamera = getFakeCamera();

export const fakeCamerasList = [getFakeCamera(), getFakeCamera(), getFakeCamera(), getFakeCamera()];

export const fakeReviewList = [getFakeCamerasReview(), getFakeCamerasReview(), getFakeCamerasReview(), getFakeCamerasReview()];

export const fakePromoCamera = getFakePromoCamera();



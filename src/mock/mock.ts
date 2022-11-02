import faker from 'faker';
import { MAX_RATING } from '../consts/const';
import { CameraType, PostReviewType, PromoCameraType, ReviewType } from '../types/server-data-types';


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
  id: faker.datatype.number({min: 1, max: 20}),
  name: faker.datatype.string(),
  previewImg: faker.datatype.string(),
  previewImg2x: faker.datatype.string(),
  previewImgWebp: faker.datatype.string(),
  previewImgWebp2x: faker.datatype.string(),
});

export const getFakeCamerasReview = (): ReviewType => ({
  id: faker.datatype.uuid(),
  userName: faker.datatype.string(),
  advantage: faker.datatype.string(),
  disadvantage: faker.datatype.string(),
  review: faker.datatype.string(),
  rating: faker.datatype.number({min: 0, max: 5}),
  createAt: String(faker.date.past(5)),
  cameraId: faker.datatype.number(),
});

export const getFakePostedReview = (): PostReviewType => ({
  cameraId: faker.datatype.number(),
  userName: faker.name.firstName(),
  advantage: faker.datatype.string(),
  disadvantage: faker.datatype.string(),
  review: faker.datatype.string(),
  rating: faker.datatype.number(MAX_RATING),
});

export const fakeCamerasList = [getFakeCamera(), getFakeCamera(), getFakeCamera(), getFakeCamera()];

export const fakeReviewList = [getFakeCamerasReview(), getFakeCamerasReview(), getFakeCamerasReview(), getFakeCamerasReview()];

export const getUidCamerasList = (count:number) => {
  const camerasList: CameraType[] = [];
  for (let i = 0; camerasList.length < count; i++) {
    const camera = getFakeCamera();
    if (!camerasList.find((item) => item.id === camera.id)) {
      camerasList.push(camera);
    }
  }
  return(
    camerasList
  );
};

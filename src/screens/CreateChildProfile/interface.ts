// import LionIcon from '@tandem/assets/svg/AnimatedLion';
// import Giraffe from '@tandem/assets/svg/Giraffe';
// import Elephant from '@tandem/assets/svg/Elephant';
// import Fox from '@tandem/assets/svg/Fox';
// import Rabbit from '@tandem/assets/svg/Rabbit';
// import Camera from '@tandem/assets/svg/Camera';

import {BASE_URL_FOR_IMAGES} from '@tandem/constants/api';

export interface indicatorType {
  index: number;
  isSelected: boolean;
}

export interface ChildProfileStateObject {
  bulletinArray: indicatorType[];
  questionIndex: number;
  gender: string;
}

export interface avatar {
  icon: any;
}

export const avatarArray: avatar[] = [
  {icon: BASE_URL_FOR_IMAGES + 'camera.png'},
  {icon: BASE_URL_FOR_IMAGES + 'lion.png'},
  {icon: BASE_URL_FOR_IMAGES + 'giraff.png'},
  {icon: BASE_URL_FOR_IMAGES + 'elephant.png'},
  {icon: BASE_URL_FOR_IMAGES + 'fox.png'},
  {icon: BASE_URL_FOR_IMAGES + 'rabit.png'},
];

// import LionIcon from '@tandem/assets/svg/AnimatedLion';
// import Giraffe from '@tandem/assets/svg/Giraffe';
// import Elephant from '@tandem/assets/svg/Elephant';
// import Fox from '@tandem/assets/svg/Fox';
// import Rabbit from '@tandem/assets/svg/Rabbit';
// import Camera from '@tandem/assets/svg/Camera';

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
  {icon: require('@tandem/assets/png/camera.png')},
  {icon: require('@tandem/assets/png/lion.png')},
  {icon: require('@tandem/assets/png/giraff.png')},
  {icon: require('@tandem/assets/png/elephant.png')},
  {icon: require('@tandem/assets/png/fox.png')},
  {icon: require('@tandem/assets/png/rabit.png')},
];

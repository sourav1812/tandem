import LionIcon from '@tandem/assets/svg/AnimatedLion';
import Giraffe from '@tandem/assets/svg/Giraffe';
import Elephant from '@tandem/assets/svg/Elephant';
import Fox from '@tandem/assets/svg/Fox';
import Rabbit from '@tandem/assets/svg/Rabbit';

export interface indicatorType {
  index: number;
  isSelected: boolean;
}

export interface childProfileStateObject {
  bulletinArray: indicatorType[];
  questionIndex: number;
  other: boolean;
}

export interface avatar {
  icon: any;
}

export const avatarArray: avatar[] = [
  {icon: LionIcon},
  {icon: Giraffe},
  {icon: Elephant},
  {icon: Fox},
  {icon: Rabbit},
];

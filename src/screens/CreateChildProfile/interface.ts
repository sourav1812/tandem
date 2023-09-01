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

export const avatarArray: avatar[] = [...new Array(29).keys()].map(key => ({
  icon: `https://tandem.geeky.dev/v1/images/avatars/avatar${key + 1}.png`,
}));

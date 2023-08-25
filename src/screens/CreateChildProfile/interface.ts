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
  icon: `https://raw.githubusercontent.com/SahilSharma-GeekyBones/Assets/main/tandem/avatar${
    key + 1
  }.png`,
}));

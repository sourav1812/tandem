import themeColor from '@tandem/theme/themeColor';

export interface inputListState {
  answer: string;
}

export interface multipleChoiceProps {
  onNextPress: () => void;
}

interface placeType {
  name: string;
  icon: string;
  bgc: string;
}

export const place: placeType[] = [
  {name: 'Bear', icon: '🐻', bgc: themeColor.red},
  {name: 'Cat', icon: '🐱', bgc: '#74D949'},
  {name: 'Cow', icon: '🐮', bgc: themeColor.red},
  {name: 'Dog', icon: '🐶', bgc: '#74D949'},
];

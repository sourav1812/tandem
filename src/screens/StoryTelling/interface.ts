import {characterProps} from '@tandem/components/RNCharacterComponent/interface';

export const characterList: characterProps[] = [
  {
    characterName: 'Princess Lili',
    url: require('@tandem/assets/png/character1.png'),
  },
  {characterName: 'Frutti', url: require('@tandem/assets/png/character2.png')},
];

export interface StateObject {
  ratingModal: boolean;
  toggleMic: boolean;
  showQuestion: boolean;
  wellDoneModal: boolean;
  isStoryRated: boolean;
}

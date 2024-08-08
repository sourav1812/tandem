import {SCREEN_NAME} from '@tandem/navigation/ComponentName';
import {ReactNode} from 'react';

export const MENU_ARRAY = [
  {name: 'TOP_UP', navigate: SCREEN_NAME.TOP_UP},
  {name: 'SUBSCRIPTION', navigate: SCREEN_NAME.SUBSCRIPTION},
];

export interface Props {
  children: ReactNode;
  title?: string;
}

import {ReactNode} from 'react';

export interface TooltipProps {
  children: ReactNode;
  count: number;
  text: string;
  top: boolean;
  rotation: number;
}

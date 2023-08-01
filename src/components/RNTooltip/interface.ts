import {ReactNode} from 'react';

export interface TooltipProps {
  children: ReactNode;
  open: boolean;
  setClose: () => void;
  text: string;
  top: boolean;
  rotation: number;
}

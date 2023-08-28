import React from 'react';
import {ConfettPieceProps} from './interface';
import {Group, RoundedRect} from '@shopify/react-native-skia';

const RNConfettiPiece = ({
  offsetId,
  startingXoffset,
  startingYoffset,
  colorCode,
}: ConfettPieceProps) => {
  const CONFETTI_HEIGHT = 30;
  const CONFETTI_WIDTH = 10;
  const colors = [
    '#FF0000',
    '#FFA500',
    '#FFFF00',
    '#00FF00',
    '#0000FF',
    '#4B0082',
    '#EE82EE',
  ];

  return (
    <Group>
      <RoundedRect
        x={startingXoffset}
        y={startingYoffset}
        height={CONFETTI_HEIGHT}
        width={CONFETTI_WIDTH}
        r={8}
        color={colors[colorCode]}
      />
    </Group>
  );
};

export default RNConfettiPiece;

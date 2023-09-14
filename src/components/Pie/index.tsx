import {Easing, runTiming, useValue} from '@shopify/react-native-skia';
import React from 'react';

import {DonutChart} from './Donut';

export const DonutChartContainer = ({
  total = 1,
  current,
}: {
  total: number;
  current: number;
}) => {
  const animationState = useValue(0);

  React.useEffect(() => {
    runTiming(animationState, current / total, {
      duration: 500,
      easing: Easing.out(Easing.exp),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  return (
    <DonutChart
      percentageComplete={animationState}
      current={current}
      total={total}
    />
  );
};

export default DonutChartContainer;

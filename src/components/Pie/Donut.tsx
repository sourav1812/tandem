import React, {FC} from 'react';

import {
  Canvas,
  Path,
  SkFont,
  Skia,
  SkiaMutableValue,
  Text,
} from '@shopify/react-native-skia';
import {StyleSheet, View} from 'react-native';

interface CircularProgressProps {
  strokeWidth: number;
  radius: number;
  backgroundColor: string;
  percentageComplete: SkiaMutableValue<number>;
  font: SkFont;
  current: number;
  total: number;
}

export const DonutChart: FC<CircularProgressProps> = ({
  strokeWidth,
  radius,
  percentageComplete,
  font,
  current,
  total,
}) => {
  const innerRadius = radius - strokeWidth;
  const targetText = `${current}/${total}`;

  const path = Skia.Path.Make();
  path.addCircle(radius, radius, innerRadius);

  return (
    <View style={styles.container}>
      <Canvas style={styles.container}>
        <Path
          path={path}
          color="orange"
          style="stroke"
          strokeJoin="round"
          strokeWidth={strokeWidth}
          strokeCap="round"
          start={0}
          end={percentageComplete}
        />
        <Text
          x={radius - 17}
          y={radius + 7}
          text={targetText}
          font={font}
          color="black"
        />
      </Canvas>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

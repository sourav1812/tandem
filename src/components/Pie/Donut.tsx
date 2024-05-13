/* eslint-disable react-native/no-inline-styles */
import React, {FC} from 'react';
import {Canvas, Path, Skia} from '@shopify/react-native-skia';
import RNTextComponent from '../RNTextComponent';
import {StyleSheet, View, useWindowDimensions} from 'react-native';
import themeColor from '@tandem/theme/themeColor';
import {verticalScale} from 'react-native-size-matters';

interface CircularProgressProps {
  percentageComplete: any;
  current: number;
  total: number;
}

const r = verticalScale(30);
const s = verticalScale(10);

export const DonutChart: FC<CircularProgressProps> = ({
  percentageComplete,
  current,
  total,
}) => {
  const path = Skia.Path.Make();
  path.addCircle(r + s, r + s, r);
  const widthDimention = useWindowDimensions().width;
  return (
    <View
      style={[
        styles.conatiner,
        {
          width: 2 * (r + s),
          height: 2 * (r + s),
          backgroundColor: 'white',
          borderRadius: 100,
          overflow: 'hidden',
          right: widthDimention / 2 - (r + s),
          bottom: verticalScale(80) - (r + s),
        },
      ]}>
      <RNTextComponent
        isSemiBold
        style={{
          position: 'absolute',
          color: themeColor.themeBlue,
        }}>{`${current}/${total}`}</RNTextComponent>
      <Canvas style={styles.conatiner}>
        <Path
          path={path}
          color="orange"
          style="stroke"
          strokeJoin="round"
          strokeWidth={s}
          strokeCap="round"
          start={0}
          end={percentageComplete}
        />
      </Canvas>
    </View>
  );
};
const styles = StyleSheet.create({
  conatiner: {
    position: 'absolute',
    zIndex: 10,
    width: 2 * (r + s),
    height: 2 * (r + s),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

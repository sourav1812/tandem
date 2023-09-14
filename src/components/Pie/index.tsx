import {Easing, runTiming, useFont, useValue} from '@shopify/react-native-skia';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {DonutChart} from './Donut';

const radius = 60;
const STROKE_WIDTH = 20;

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

  const font = useFont(
    require('@tandem/assets/fonts/Poppins-SemiBold.ttf'),
    20,
  );

  if (!font) {
    return <View />;
  }

  return (
    <View style={styles.ringChartContainer}>
      <DonutChart
        backgroundColor="transparent"
        radius={radius}
        strokeWidth={STROKE_WIDTH}
        percentageComplete={animationState}
        current={current}
        total={total}
        font={font}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ringChartContainer: {
    width: radius * 2,
    height: radius * 2,
  },
  button: {
    marginTop: 40,
    backgroundColor: 'orange',
    paddingHorizontal: 60,
    paddingVertical: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
});

export default DonutChartContainer;

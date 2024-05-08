import {useWindowDimensions} from 'react-native';
import React, {useMemo} from 'react';
import {
  Blur,
  Canvas,
  Circle,
  ColorMatrix,
  Group,
  Paint,
  SweepGradient,
  vec,
} from '@shopify/react-native-skia';
import {
  useSharedValue,
  useAnimatedSensor,
  SensorType,
  useDerivedValue,
  withSpring,
  ReduceMotion,
} from 'react-native-reanimated';

const RADIUS = 80;

export default function App() {
  const {width: windowWidth, height: windowHeight} = useWindowDimensions();
  const acc = useAnimatedSensor(SensorType.ACCELEROMETER);
  const cx = useSharedValue(windowWidth / 2);
  const cy = useSharedValue(windowHeight / 2);
  const springConfig = {
    mass: 1,
    damping: 10,
    stiffness: 300,
    overshootClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 2,
    reduceMotion: ReduceMotion.System,
  };
  useDerivedValue(() => {
    const {x, y} = acc.sensor.value;
    cx.value = withSpring(windowWidth / 2 + 15 * x, springConfig);
    cy.value = withSpring(windowHeight / 2 - 30 * y, springConfig);
  }, []);
  const layer = useMemo(() => {
    return (
      <Paint>
        {/* pixelOpacity > blurredOpacity * 60 - 30 */}
        <Blur blur={20} />
        <ColorMatrix
          matrix={[
            // R, G, B, A, Bias (Offset)
            // prettier-ignore
            1, 0, 0, 0, 0,
            // prettier-ignore
            0, 1, 0, 0, 0,
            // prettier-ignore
            0, 0, 1, 0, 0,
            // prettier-ignore
            0, 0, 0, 60, -30,
          ]}
        />
      </Paint>
    );
  }, []);

  return (
    <>
      <Canvas
        style={{
          flex: 1,
          backgroundColor: '#fff',
        }}>
        <Group layer={layer}>
          <Circle cx={cx} cy={cy} r={RADIUS} />
          <Circle cx={windowWidth / 2} cy={windowHeight / 2} r={RADIUS - 20} />
          <SweepGradient
            c={vec(windowWidth / 2, windowHeight / 2)}
            colors={['red', 'yellow', 'purple']}
          />
        </Group>
      </Canvas>
    </>
  );
}

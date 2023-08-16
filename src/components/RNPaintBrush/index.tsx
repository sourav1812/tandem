import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureStateChangeEvent,
  GestureUpdateEvent,
  PanGestureHandlerEventPayload,
} from 'react-native-gesture-handler';
import {
  Canvas,
  DisplacementMap,
  Path,
  RuntimeShader,
  Turbulence,
} from '@shopify/react-native-skia';
import {frag, Core} from './shaders';
import {verticalScale} from 'react-native-size-matters';

interface IPath {
  segments: String[];
  color?: string;
  size: number;
}
const source = frag`
    uniform shader image;
    ${Core}
  vec4 main(float2 xy) {
    return mix(image.eval(xy),TRANSPARENT,0.5);
  }`;

export default ({height, color}: {height: number; color: string}) => {
  const [paths, setPaths] = useState<IPath[]>([]);
  const [sizeOfBrush] = useState(verticalScale(30));

  const restartPen = (
    g: GestureStateChangeEvent<PanGestureHandlerEventPayload>,
  ) => {
    if (color === 'transparent') return;
    const newPaths = [...paths];
    newPaths[paths.length] = {
      segments: [],
      color,
      size: sizeOfBrush,
    };
    newPaths[paths.length].segments.push(`M ${g.x} ${g.y}`);
    setPaths(newPaths);
  };
  const drawWithPaint = (
    g: GestureUpdateEvent<PanGestureHandlerEventPayload>,
  ) => {
    const index = paths.length - 1;
    const newPaths = [...paths];
    if (newPaths?.[index]?.segments) {
      newPaths[index].segments.push(`L ${g.x} ${g.y}`);
      setPaths(newPaths);
    }
  };

  const pan = Gesture.Pan()
    .runOnJS(true)
    .onStart(restartPen)
    .onUpdate((g: GestureUpdateEvent<PanGestureHandlerEventPayload>) => {
      drawWithPaint(g);
    })
    .onTouchesUp(() => {
      const newPaths = [...paths];
      setPaths(newPaths);
    })
    .minDistance(1);

  // const clearCanvas = () => {
  //   setPaths([]);
  // };

  return (
    <View style={[styles.paintWrapper, {height, width: height}]}>
      <GestureDetector gesture={pan}>
        <Canvas style={{height, width: height}}>
          {paths.map((p, index) => (
            <Path
              key={index}
              path={p.segments.join(' ')}
              strokeWidth={p.size}
              style="stroke"
              strokeCap="round"
              strokeJoin="round"
              color={p.color}
            />
          ))}
          <DisplacementMap channelX="g" channelY="a" scale={20}>
            <Turbulence freqX={0.1} freqY={0.05} octaves={2} seed={2} />
          </DisplacementMap>
          <RuntimeShader source={source} />
        </Canvas>
      </GestureDetector>
    </View>
  );
};

const styles = StyleSheet.create({
  paintWrapper: {
    borderRadius: 1000,
    overflow: 'hidden',
  },
});

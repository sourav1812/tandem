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
  Circle,
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

export default ({
  height,
  color,
  setPathsParent,
  clear,
  usedColor,
}: {
  height: number;
  color: string;
  setPathsParent: React.Dispatch<React.SetStateAction<IPath[]>>;
  clear: boolean;
  usedColor: string[];
}) => {
  const [paths, setPaths] = useState<IPath[]>([]);
  const [sizeOfBrush] = useState(verticalScale(30));
  const [allowMixing, setAllowMixing] = useState(false);
  const [randomCircles, setrandomCircles] = useState<{r: number; c: number}[]>(
    [],
  );
  React.useEffect(() => {
    if (color === 'transparent' || !allowMixing) {
      return;
    }
    const newPaths = [...paths];
    const lastPosRef = newPaths[newPaths.length - 1]?.segments;
    if (!lastPosRef) {
      return;
    }
    newPaths[paths.length] = {
      segments: [],
      color,
      size: sizeOfBrush,
    };
    newPaths[paths.length].segments.push(
      lastPosRef[lastPosRef.length - 1].replace('L', 'M'),
    );
    setPaths(newPaths);
    setPathsParent(newPaths);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [color, allowMixing]);

  React.useEffect(() => {
    if (usedColor.length !== 0) {
      return;
    }
    const random1 = Math.floor((Math.random() + 1) * 4);
    const random2 = Math.floor((Math.random() + 1) * 3);
    const r1 = verticalScale(random1 * 10);
    const r2 = verticalScale(random2 * 10);
    const c1 = height / (Math.random() + 1.6);
    const c2 = height / (Math.random() + 1.6);
    setrandomCircles([
      {r: r1, c: c1},
      {r: r2, c: c2},
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usedColor.length]);

  const restartPen = (
    g: GestureStateChangeEvent<PanGestureHandlerEventPayload>,
  ) => {
    if (color === 'transparent') {
      return;
    }
    const newPaths = [...paths];
    newPaths[paths.length] = {
      segments: [],
      color,
      size: sizeOfBrush,
    };
    newPaths[paths.length].segments.push(`M ${g.x} ${g.y}`);
    setPaths(newPaths);
    setPathsParent(newPaths);
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
      if (!allowMixing) {
        setAllowMixing(true);
      }
    })
    .onTouchesUp(() => {
      if (allowMixing) {
        setAllowMixing(false);
      }
    })
    .minDistance(0);

  React.useEffect(() => {
    if (clear) {
      setPaths([]);
    }
  }, [clear]);

  return (
    <View style={[styles.paintWrapper, {height, width: height}]}>
      <GestureDetector gesture={pan}>
        <Canvas style={{height, width: height}}>
          {usedColor.map((colorRef, index) => (
            <Circle
              key={index.toString()}
              cx={randomCircles[index].c}
              cy={randomCircles[index].c}
              r={randomCircles[index].r}
              color={colorRef}
            />
          ))}
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

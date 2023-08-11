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
  Path,
  RuntimeShader,
  useComputedValue,
} from '@shopify/react-native-skia';
import {frag, Core} from './shaders';

interface IPath {
  segments: String[];
  color?: string;
  size: number;
}
const source = frag`
    uniform shader image;
    uniform vec2 resolution;
    uniform float2 coordinates_with_offset;
    uniform float2 originals;
    ${Core}
    
  vec4 main(float2 xy) {
    Context ctx = Context(image.eval(xy), xy, resolution);

    // ! calculate the color
    Context active_point = Context(image.eval(xy), xy, resolution);
    Context main_point = Context(image.eval(xy), xy, resolution);

    active_point.color = image.eval(coordinates_with_offset);
    main_point.color = image.eval(originals);

    main_point.color = mix(active_point.color,main_point.color,0.5);
    // ! calculate head pixel position
    int x_1 = int(coordinates_with_offset[0]);
    int y_1 = int(coordinates_with_offset[1]);
    int x_2 = int(xy.x);
    int y_2 = int(xy.y);

    if(x_2 < x_1+5 && y_2 < y_1+5 && x_2 > x_1-5 && y_2 > y_1-5){
      // ! calculate the color
      return main_point.color;
    } else {
      ctx.color = image.eval(xy);
      return ctx.color; 
    }

    // vec4 my_color = vec4(1, 0, 0, 1);
    // Paint my_paint = createStroke(my_color, 20);
    // drawLine(ctx, coordinates_with_offset,originals, my_paint);
    // return ctx.color; 
    // return vec4(1, 0, 0, 1); // ! r g b a
  }`;

export default ({height, color}: {height: number; color: string}) => {
  const [paths, setPaths] = useState<IPath[]>([]);
  const [coordinates, setCoordinates] = useState<[number, number]>([0, 0]);
  const [originals, setOriginals] = useState<[number, number]>([0, 0]);
  const [sizeOfBrush] = useState(20);

  // const modifySizeOfBrush = () => {
  //   const avgVelocity = Math.sqrt(g.velocityX ** 2 + g.velocityY ** 2) || 1;
  //   let sizeOfBrushTemp = Math.floor((20 * 200) / avgVelocity);
  //   setSizeOfBrush(
  //     sizeOfBrushTemp < 2 ? 2 : sizeOfBrushTemp > 20 ? 20 : sizeOfBrushTemp,
  //   );
  // };

  const uniforms = useComputedValue(() => {
    return {
      resolution: [height, height],
      coordinates_with_offset: coordinates,
      originals,
    };
  }, [coordinates]);

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

  // When Reanimated is installed, Gesture Handler will try to run on the UI thread
  // We can't do that here because we're accessing the component state, so we need set runOnJS(true)
  const pan = Gesture.Pan()
    .runOnJS(true)
    .onStart(restartPen)
    .onUpdate((g: GestureUpdateEvent<PanGestureHandlerEventPayload>) => {
      // ! need to provide some offest to detect surrounding colors
      // ! we will have to detect offeset pos with velocity
      const offsetX = g.velocityX >= 0 ? sizeOfBrush / 2 : -sizeOfBrush / 2;
      const offsetY = g.velocityY >= 0 ? sizeOfBrush / 2 : -sizeOfBrush / 2;
      setOriginals([g.x, g.y]);
      setCoordinates([g.x + offsetX, g.y + offsetY]);
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
              antiAlias
            />
          ))}
          <RuntimeShader source={source} uniforms={uniforms} />
        </Canvas>
      </GestureDetector>
    </View>
  );
};

const styles = StyleSheet.create({
  paintWrapper: {
    borderRadius: 100,
    overflow: 'hidden',
  },
});

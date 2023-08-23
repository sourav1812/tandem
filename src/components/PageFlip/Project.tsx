import {
  Easing,
  runTiming,
  useComputedValue,
  useValue,
  useTouchHandler,
  Canvas,
  Group,
  Paint,
  RuntimeShader,
  Skia,
  BackdropBlur,
  Fill,
  Text,
  useFont,
  Image,
  useImage,
  rrect,
  rect,
} from '@shopify/react-native-skia';
import {Dimensions, PixelRatio} from 'react-native';
import React from 'react';

import {pageCurl} from './pageCurl';
import {verticalScale} from 'react-native-size-matters';

const {width: wWidth, height: hHeight} = Dimensions.get('screen');
const pd = PixelRatio.get();
const height = hHeight;
const outer = Skia.XYWHRect(0, 0, wWidth, height);
const pad = 0;
const cornerRadius = 0;

const inner = Skia.RRectXY(
  Skia.XYWHRect(pad, pad, wWidth - pad * 2, height - pad * 2),
  cornerRadius,
  cornerRadius,
);

const processSentences = (text: string, numberOfChars: number) => {
  let maxCharsReached = 0;
  let wordsArray: string[] = [];
  const sentenceArray: string[] = [];

  text.split(' ').forEach(word => {
    if (maxCharsReached + word.length <= numberOfChars) {
      wordsArray.push(word);
      maxCharsReached += word.length;
    } else {
      const sentence = wordsArray.join(' ');
      sentenceArray.push(sentence);
      wordsArray = [];
      maxCharsReached = 0;
      wordsArray.push(word);
      maxCharsReached += word.length;
    }
  });
  const sentence = wordsArray.join(' ');
  sentenceArray.push(sentence);
  return sentenceArray;
};

interface ProjectProps {
  text1: string;
  text2: string;
  pic1: any;
  pic2: any;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  activeIndex: number;
}

export const Project = ({
  text1,
  text2,
  pic1,
  pic2,
  setActiveIndex,
}: ProjectProps) => {
  const {width} = outer;
  const image1 = useImage(pic1);
  const image2 = useImage(pic2);
  const origin = useValue(width);
  const pointer = useValue(width);
  const [showBackdrop, setShowBackdrop] = React.useState(false);
  const fontSize = verticalScale(16);
  const numberOfChars = Math.floor((width * 1.5) / fontSize);
  const [sentences1, setSentences1] = React.useState<string[]>([]);
  const [sentences2, setSentences2] = React.useState<string[]>([]);
  const padding = verticalScale(50);

  React.useEffect(() => {
    setSentences1(processSentences(text1, numberOfChars).reverse());
    setSentences2(processSentences(text2, numberOfChars).reverse());
    if (!showBackdrop) {
      setShowBackdrop(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text1]);

  const onTouch = useTouchHandler({
    onStart: ({x}) => {
      origin.current = x;
    },
    onActive: ({x}) => {
      pointer.current = x;
    },
    onEnd: ({x}) => {
      // ! conditional if we intend to go to next page the animation should be of page disappearing
      const turnpage = x < 100;
      runTiming(pointer, turnpage ? -width : width, {
        duration: 1000,
        easing: Easing.in(Easing.sin),
      });
      if (turnpage) {
        setTimeout(() => {
          // TODO : DO SOMETHING ABOUT ASYNC BETWEEN THESE 2 UPDATES
          setActiveIndex(prev => prev + 1);
          pointer.current = width;
        }, 1000);
      }
    },
  });

  const font = useFont(
    require('@tandem/assets/fonts/Poppins-SemiBold.ttf'),
    fontSize,
  );
  const roundedRect1 = rrect(
    rect(0, height - padding - fontSize * sentences1.length, wWidth, hHeight),
    20,
    20,
  );
  const roundedRect2 = rrect(
    rect(0, height - padding - fontSize * sentences2.length, wWidth, hHeight),
    20,
    20,
  );
  const uniforms = useComputedValue(() => {
    return {
      pointer: pointer.current * pd,
      origin: origin.current * pd,
      resolution: [outer.width * pd, outer.height * pd],
      container: [
        inner.rect.x,
        inner.rect.y,
        inner.rect.x + inner.rect.width,
        inner.rect.y + inner.rect.height,
      ].map(v => v * pd),
      cornerRadius: cornerRadius * pd,
    };
  }, [pointer, origin]);

  return (
    <Canvas
      style={{
        width: outer.width,
        height: outer.height,
      }}
      onTouch={onTouch}>
      <Group clip={inner}>
        <Image image={image2} rect={inner.rect} fit="cover" />
        {showBackdrop && (
          <BackdropBlur blur={8} clip={roundedRect2}>
            <Fill color="rgba(255, 255, 255, 0.438)" />
          </BackdropBlur>
        )}
        {sentences2.map((sentence, index) => (
          <Text
            key={index.toString()}
            x={width / 2 - ((sentence.length / numberOfChars) * width) / 2.5}
            y={height - padding / 2 - fontSize * index} //  number of line the text is on
            text={sentence}
            font={font}
          />
        ))}
      </Group>
      <Group transform={[{scale: 1 / pd}]}>
        <Group
          layer={
            <Paint>
              <RuntimeShader source={pageCurl} uniforms={uniforms} />
            </Paint>
          }
          transform={[{scale: pd}]}
          clip={inner}>
          <Image image={image1} rect={inner.rect} fit="cover" />
          {showBackdrop && (
            <BackdropBlur blur={8} clip={roundedRect1}>
              <Fill color="rgba(255, 255, 255, 0.438)" />
            </BackdropBlur>
          )}
          {sentences1.map((sentence, index) => (
            <Text
              key={index.toString()}
              x={width / 2 - ((sentence.length / numberOfChars) * width) / 2.5}
              y={height - padding / 2 - fontSize * index} //  number of line the text is on
              text={sentence}
              font={font}
            />
          ))}
        </Group>
      </Group>
    </Canvas>
  );
};

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
  SkFont,
  SkImage,
  SkRRect,
} from '@shopify/react-native-skia';
import {Dimensions, PixelRatio} from 'react-native';
import React from 'react';
import {pageCurl} from './pageCurl';
import {verticalScale} from 'react-native-size-matters';

interface ProjectProps {
  text1: string;
  text2: string;
  pic1: any;
  pic2: any;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  activeIndex: number;
}
interface RenderSceneProps {
  image: SkImage | null;
  showBackdrop: boolean;
  roundedRect: SkRRect;
  sentences: string[];
  font: SkFont | null;
}

const {width: wWidth, height: hHeight} = Dimensions.get('screen');
const pd = PixelRatio.get();
const outer = Skia.XYWHRect(0, 0, wWidth, hHeight);
const cornerRadius = 0;
const padding = verticalScale(50);
const fontSize = verticalScale(16);
const numberOfChars = Math.floor((wWidth * 1.5) / fontSize);

const processSentences = (text: string) => {
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

  return sentenceArray.reverse();
};

const getRoundRect = (length: number) => {
  return rrect(
    rect(0, hHeight - padding - fontSize * length, wWidth, hHeight),
    20,
    20,
  );
};

export const Project = ({
  text1,
  text2,
  pic1,
  pic2,
  setActiveIndex,
}: ProjectProps) => {
  const font = useFont(
    require('@tandem/assets/fonts/Poppins-SemiBold.ttf'),
    fontSize,
  );

  const image1 = useImage(pic1);
  const image2 = useImage(pic2);

  const origin = useValue(wWidth);
  const pointer = useValue(wWidth);

  const [showBackdrop, setShowBackdrop] = React.useState(false);
  const [sentences1, setSentences1] = React.useState<string[]>([]);
  const [sentences2, setSentences2] = React.useState<string[]>([]);

  const roundedRect1 = getRoundRect(sentences1.length);
  const roundedRect2 = getRoundRect(sentences2.length);

  React.useEffect(() => {
    setSentences1(processSentences(text1));
    setSentences2(processSentences(text2));

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
      runTiming(pointer, turnpage ? -wWidth : wWidth, {
        duration: 1000,
        easing: Easing.in(Easing.sin),
      });
      if (turnpage) {
        setTimeout(() => {
          // TODO : DO SOMETHING ABOUT ASYNC BETWEEN THESE 2 UPDATES
          setActiveIndex(prev => prev + 1);
          pointer.current = wWidth;
        }, 1000);
      }
    },
  });

  const uniforms = useComputedValue(() => {
    return {
      pointer: pointer.current * pd,
      origin: origin.current * pd,
      resolution: [outer.width * pd, outer.height * pd],
      container: [
        outer.x,
        outer.y,
        outer.x + outer.width,
        outer.y + outer.height,
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
      <RenderScene
        image={image2}
        roundedRect={roundedRect2}
        sentences={sentences2}
        showBackdrop={showBackdrop}
        font={font}
      />
      <Group transform={[{scale: 1 / pd}]}>
        <Group
          layer={
            <Paint>
              <RuntimeShader source={pageCurl} uniforms={uniforms} />
            </Paint>
          }
          transform={[{scale: pd}]}>
          <RenderScene
            image={image1}
            roundedRect={roundedRect1}
            sentences={sentences1}
            showBackdrop={showBackdrop}
            font={font}
          />
        </Group>
      </Group>
    </Canvas>
  );
};

const RenderScene = ({
  image,
  showBackdrop,
  roundedRect,
  sentences,
  font,
}: RenderSceneProps) => {
  return (
    <Group>
      <Image image={image} rect={outer} fit="cover" />
      {showBackdrop && (
        <BackdropBlur blur={8} clip={roundedRect}>
          <Fill color="rgba(255, 255, 255, 0.438)" />
        </BackdropBlur>
      )}
      {sentences.map((sentence, index) => (
        <Text
          key={index.toString()}
          x={wWidth / 2 - ((sentence.length / numberOfChars) * wWidth) / 2.5}
          y={hHeight - padding / 2 - fontSize * index} //  number of line the text is on
          text={sentence}
          font={font}
        />
      ))}
    </Group>
  );
};

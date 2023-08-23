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
  SkRRect,
} from '@shopify/react-native-skia';
import {Dimensions, PixelRatio} from 'react-native';
import React from 'react';
import {pageCurl} from './pageCurl';
import {verticalScale} from 'react-native-size-matters';

interface ProjectProps {
  textArray: {
    text: string;
    img: any;
  }[];
}
interface RenderSceneProps {
  image: any;
  roundedRect: SkRRect;
  sentences: string[];
  font: SkFont | null;
  mount?: boolean;
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

export const Project = ({textArray}: ProjectProps) => {
  const font = useFont(
    require('@tandem/assets/fonts/Poppins-SemiBold.ttf'),
    fontSize,
  );

  const origin = useValue(wWidth);
  const pointer = useValue(wWidth);

  const [activeIndex, setActiveIndex] = React.useState(textArray.length - 1);
  const [show, setShow] = React.useState(true);

  React.useEffect(() => {
    if (!show) {
      pointer.current = wWidth;
      setActiveIndex(prev => (prev > 1 ? prev - 1 : 1));
      setShow(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

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
          setShow(false);
        }, 800);
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
        image={textArray[activeIndex - 1].img}
        roundedRect={getRoundRect(
          processSentences(textArray[activeIndex - 1].text).length,
        )}
        sentences={processSentences(textArray[activeIndex - 1].text)}
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
          {textArray.map((obj, index) => {
            const sentence = processSentences(obj.text);
            return (
              <RenderScene
                mount={
                  show
                    ? index === activeIndex || index === activeIndex - 1
                    : index === activeIndex - 1
                }
                key={index.toString()}
                image={obj.img}
                roundedRect={getRoundRect(sentence.length)}
                sentences={sentence}
                font={font}
              />
            );
          })}
        </Group>
      </Group>
    </Canvas>
  );
};

const RenderScene = ({
  image,
  mount = true,
  roundedRect,
  sentences,
  font,
}: RenderSceneProps) => {
  const imageRef = useImage(image);

  const [showBackdrop, setShowBackdrop] = React.useState(false);
  React.useEffect(() => {
    if (!showBackdrop) {
      setShowBackdrop(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (!mount) {
    return null;
  }
  return (
    <Group>
      <Image image={imageRef} rect={outer} fit="cover" />
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

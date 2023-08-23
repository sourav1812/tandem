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
  RoundedRect,
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
  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
}
interface RenderSceneProps {
  image: any;
  roundedRect: SkRRect;
  sentences: string[];
  font: SkFont | null;
  mount?: boolean;
  page: number;
  total: number;
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
    rect(0, hHeight - 1.5 * padding - fontSize * length, wWidth, hHeight),
    20,
    20,
  );
};

export const Project = ({
  textArray,
  activeIndex,
  setActiveIndex,
}: ProjectProps) => {
  const font = useFont(
    require('@tandem/assets/fonts/Poppins-SemiBold.ttf'),
    fontSize,
  );

  const origin = useValue(wWidth);
  const pointer = useValue(wWidth);

  const [show, setShow] = React.useState(true);
  const [disbaleTouch, setDisbaleTouch] = React.useState(false);

  React.useEffect(() => {
    if (!show) {
      pointer.current = wWidth;
      setActiveIndex(prev => (prev > 0 ? prev - 1 : 0));
      setShow(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  const turnPage = (x: number) => {
    const turnpage = x < 100;
    runTiming(pointer, turnpage ? -wWidth : wWidth, {
      duration: 1000,
      easing: Easing.in(Easing.sin),
    });
    if (turnpage) {
      setDisbaleTouch(true);
      setTimeout(() => {
        setShow(false);
        setTimeout(() => {
          setDisbaleTouch(false);
        }, 100);
      }, 1000);
    }
  };

  const onTouch = useTouchHandler({
    onStart: ({x}) => {
      origin.current = x;
    },
    onActive: ({x}) => {
      pointer.current = x;
    },
    onEnd: ({x}) => {
      turnPage(x);
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
      onTouch={disbaleTouch ? undefined : onTouch}>
      {activeIndex - 1 >= 0 && (
        <RenderScene
          page={activeIndex}
          total={textArray.length}
          image={textArray[activeIndex - 1].img}
          roundedRect={getRoundRect(
            processSentences(textArray[activeIndex - 1].text).length,
          )}
          sentences={processSentences(textArray[activeIndex - 1].text)}
          font={font}
        />
      )}
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
                page={index + 1}
                total={textArray.length}
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
  page,
  total,
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
      <Progressbar page={page} total={total} length={sentences.length} />
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

const Progressbar = ({
  page,
  total,
  length,
}: {
  page: number;
  total: number;
  length: number;
}) => {
  return (
    <Group>
      <RoundedRect
        x={verticalScale(20)}
        y={hHeight - padding - fontSize * length}
        width={wWidth - verticalScale(40)}
        height={verticalScale(12)}
        r={10}
        color="white"
      />
      <RoundedRect
        x={verticalScale(20)}
        y={hHeight - padding - fontSize * length}
        width={(wWidth - verticalScale(40)) * ((total + 1 - page) / total)}
        height={verticalScale(12)}
        r={10}
        color="#4285F6"
      />
    </Group>
  );
};

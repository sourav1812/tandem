/* eslint-disable react-native/no-inline-styles */
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
  SkRect,
  SkImage,
  makeImageFromView,
} from '@shopify/react-native-skia';
import {
  PixelRatio,
  Pressable,
  StatusBar,
  useWindowDimensions,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {pageCurl} from './pageCurl';

import {scale, verticalScale} from 'react-native-size-matters';
import {StateObject} from '@tandem/screens/StoryTelling/interface';
import {translation} from '@tandem/utils/methods';
import wait from '@tandem/functions/wait';
import {useAppSelector} from '@tandem/hooks/navigationHooks';
import {useDispatch} from 'react-redux';
import {changeTooltipState} from '@tandem/redux/slices/tooltip.slice';

const PAPER = require('@tandem/assets/png/paper.jpg');

interface ProjectProps {
  textArray: {
    text: string;
    img: any;
  }[];
  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  tooltipState: StateObject;
  setTooltipState: React.Dispatch<React.SetStateAction<StateObject>>;
}
interface RenderSceneProps {
  image: any;
  roundedRect: SkRRect;
  sentences: string[];
  font: SkFont | null;
  mount?: boolean;
  page: number;
  total: number;
  hHeight: number;
  outer: SkRect;
  tooltipArray: any;
}

const pd = PixelRatio.get();
const cornerRadius = 0;
const padding = verticalScale(70);
const fontSize = verticalScale(20);

const processSentences = (text: string, wWidth: number) => {
  const numberOfChars = Math.floor((wWidth * 1.35) / fontSize);
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

const getRoundRect = (length: number, wWidth: number, hHeight: number) => {
  return rrect(
    rect(
      0,
      hHeight - 1.5 * padding - (fontSize + verticalScale(10)) * length,
      wWidth,
      hHeight,
    ),
    20,
    20,
  );
};

export const Project = ({
  textArray,
  activeIndex,
  setActiveIndex,
}: ProjectProps) => {
  const {width: wWidth, height: heightRef} = useWindowDimensions();
  const [hHeight, setHeight] = useState(
    heightRef + (StatusBar.currentHeight || 0),
  );

  React.useEffect(() => {
    setHeight(heightRef + (StatusBar.currentHeight || 0));
  }, [heightRef]);

  const outer = Skia.XYWHRect(0, 0, wWidth, hHeight);

  const font = useFont(
    require('@tandem/assets/fonts/Poppins-SemiBold.ttf'),
    fontSize,
  );

  const origin = useValue(wWidth);
  const pointer = useValue(wWidth);

  const [disbaleTouch, setDisbaleTouch] = React.useState(false);
  const tooltipArray = useAppSelector(state => state.tooltipReducer);
  const dispatch = useDispatch();
  const [overlay, setOverlay] = React.useState<SkImage | null>(null);
  const [overlay2, setOverlay2] = React.useState<SkImage | null>(null);
  const ref = useRef(null);
  const ref2 = useRef(null);
  const [bottomPageIndex, setBottomPageindex] = React.useState(activeIndex);
  const [bottomPageIndex2, setBottomPageindex2] = React.useState(activeIndex);
  const onTouch = useTouchHandler(
    {
      onStart: async ({x}) => {
        if (disbaleTouch) {
          return;
        }

        if (!overlay) {
          const overlay1 = await makeImageFromView(ref);
          setOverlay(overlay1);
        }

        setBottomPageindex(activeIndex > 0 ? activeIndex - 1 : 0);
        origin.current = x;
      },
      onActive: ({x}) => {
        if (disbaleTouch || !overlay) {
          return;
        }
        pointer.current = x;
      },
      onEnd: async ({x}) => {
        if (disbaleTouch) {
          return;
        }
        setDisbaleTouch(true);

        const frontFlip = origin.current >= pointer.current;

        if (frontFlip) {
          // ! origin greater than pointer then page flip
          await frontTurn(x);
        } else {
          // ! pointer greater than origin then back flip
          await backTurn();
        }
        setDisbaleTouch(false);
      },
    },
    [disbaleTouch, activeIndex, overlay],
  );
  const backTurn = async () => {
    if (activeIndex + 1 === textArray.length) {
      return;
    }
    setBottomPageindex2(
      activeIndex + 2 <= textArray.length ? activeIndex + 1 : activeIndex,
    );
    setOverlay2(overlay);
    await wait(50);
    const overlayBeforePage = await makeImageFromView(ref2);

    pointer.current = -wWidth;
    setOverlay(overlayBeforePage);

    runTiming(pointer, wWidth, {
      duration: 800,
      easing: Easing.in(Easing.sin),
    });
    setBottomPageindex(
      activeIndex + 2 <= textArray.length ? activeIndex + 1 : activeIndex,
    );
    setActiveIndex(prev => (prev + 2 <= textArray.length ? prev + 1 : prev));
    await wait(800);
    setOverlay2(null);
    setOverlay(null);
    pointer.current = wWidth;
    origin.current = wWidth;
  };
  const frontTurn = async (x: number) => {
    const turnpage = x < 100;
    runTiming(pointer, turnpage ? -wWidth : wWidth, {
      duration: 900,
      easing: Easing.in(Easing.sin),
    });
    if (turnpage) {
      setActiveIndex(prev => (prev > 0 ? prev - 1 : 0));
      await wait(850);
      setOverlay(null);
      await wait(50);
      pointer.current = wWidth;
      origin.current = wWidth;
    }
  };
  const uniforms = useComputedValue(() => {
    return {
      pointer: pointer.current * pd,
      origin: origin.current * pd,
      resolution: [wWidth * pd, hHeight * pd],
      container: [0, 0, wWidth, hHeight].map(v => v * pd),
      cornerRadius: cornerRadius * pd,
    };
  }, [pointer, origin, hHeight]);
  return (
    <>
      {!tooltipArray?.[15] && (
        <Pressable
          style={{
            backgroundColor: 'tranparent',
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 1,
          }}
          onPress={() => {
            if (!tooltipArray?.[15]) {
              dispatch(changeTooltipState(15));
            }
          }}
        />
      )}
      <Canvas
        ref={ref}
        style={{
          width: wWidth,
          height: hHeight,
        }}
        onTouch={
          tooltipArray?.[15]
            ? activeIndex === 0
              ? undefined
              : onTouch
            : undefined
        }>
        {activeIndex >= 0 && (
          <RenderScene
            hHeight={hHeight}
            outer={outer}
            page={bottomPageIndex + 1}
            total={textArray.length}
            image={textArray[bottomPageIndex].img}
            roundedRect={getRoundRect(
              processSentences(textArray[bottomPageIndex].text, wWidth).length,
              wWidth,
              hHeight,
            )}
            sentences={processSentences(
              textArray[bottomPageIndex].text,
              wWidth,
            )}
            font={font}
            // tooltipState={tooltipState}
            tooltipArray={tooltipArray}
          />
        )}
        {overlay2 && <Image image={overlay2} rect={outer} fit="cover" />}

        {overlay && (
          <Group transform={[{scale: 1 / pd}]}>
            <Group
              layer={
                <Paint>
                  <RuntimeShader source={pageCurl} uniforms={uniforms} />
                </Paint>
              }
              transform={[{scale: pd}]}>
              <Image image={overlay} rect={outer} fit="cover" />
            </Group>
          </Group>
        )}
      </Canvas>
      <Canvas
        ref={ref2}
        style={{
          width: wWidth,
          height: hHeight,
        }}>
        <RenderScene
          hHeight={hHeight}
          outer={outer}
          page={bottomPageIndex2 + 1}
          total={textArray.length}
          image={textArray[bottomPageIndex2].img}
          roundedRect={getRoundRect(
            processSentences(textArray[bottomPageIndex2].text, wWidth).length,
            wWidth,
            hHeight,
          )}
          sentences={processSentences(textArray[bottomPageIndex2].text, wWidth)}
          font={font}
          // tooltipState={tooltipState}
          tooltipArray={tooltipArray}
        />
      </Canvas>
    </>
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
  outer,
  hHeight,
  tooltipArray,
}: RenderSceneProps) => {
  const imageRef = useImage(image || PAPER);
  const [showBackdrop, setShowBackdrop] = React.useState(false);
  const arrowImage = useImage(require('../../assets/png/SouthArrow.png'));
  const {width: wWidth} = useWindowDimensions();

  const arrowRect = Skia.XYWHRect(
    wWidth / 2,
    hHeight -
      padding -
      (fontSize + verticalScale(10)) * sentences.length -
      verticalScale(100),
    verticalScale(30),
    verticalScale(60),
  );
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
      {!tooltipArray?.[15] && (
        <>
          <BackdropBlur blur={0} clip={outer}>
            <Fill color="rgba(35, 35, 35, 0.9)" />
          </BackdropBlur>
          <Text
            x={wWidth / 2 - scale(50)}
            y={
              hHeight -
              padding -
              (fontSize + verticalScale(10)) * sentences.length -
              verticalScale(120)
            }
            //  number of line the text is on
            text={translation('READ_A_STORY')}
            color={'white'}
            font={font}
          />
          <Image image={arrowImage} rect={arrowRect} fit="cover" />
        </>
      )}
      {showBackdrop && (
        <BackdropBlur blur={8} clip={roundedRect}>
          {!tooltipArray?.[15] ? (
            <Fill color="rgba(255, 255, 255, 0.876)" />
          ) : (
            <Fill color="rgba(255, 255, 255, 0.438)" />
          )}
        </BackdropBlur>
      )}
      <Progressbar
        hHeight={hHeight}
        page={page}
        total={total}
        length={sentences.length}
      />
      {sentences.map((sentence, index) => (
        <Text
          key={index.toString()}
          x={
            verticalScale(25)
            // wWidth / 2 - ((sentence.length / numberOfChars) * wWidth) / 2.5
          }
          y={hHeight - padding / 2 - (fontSize + verticalScale(10)) * index} //  number of line the text is on
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
  hHeight,
}: {
  page: number;
  total: number;
  length: number;
  hHeight: number;
}) => {
  const {width: wWidth} = useWindowDimensions();
  return (
    <Group>
      <RoundedRect
        x={verticalScale(20)}
        y={hHeight - padding - (fontSize + verticalScale(10)) * length}
        width={wWidth - verticalScale(40)}
        height={verticalScale(12)}
        r={10}
        color="white"
      />
      <RoundedRect
        x={verticalScale(20)}
        y={hHeight - padding - (fontSize + verticalScale(10)) * length}
        width={(wWidth - verticalScale(40)) * ((total + 1 - page) / total)}
        height={verticalScale(12)}
        r={10}
        color="#4285F6"
      />
    </Group>
  );
};

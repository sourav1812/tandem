import {
  LayoutAnimation,
  Platform,
  Pressable,
  StatusBar,
  View,
  useWindowDimensions,
} from 'react-native';
import React, {useState} from 'react';
import {styles} from './styles';
import YellowButton from '@tandem/assets/svg/YellowButton';
import RNTextComponent from '@tandem/components/RNTextComponent';
import {translation} from '@tandem/utils/methods';
import Who from '@tandem/assets/svg/Who';
import Where from '@tandem/assets/svg/Where';
import themeColor from '@tandem/theme/themeColor';
import WhatThing from '@tandem/assets/svg/WhatThing';
import WhatHappens from '@tandem/assets/svg/WhatHappens';
import StyleColor from '@tandem/assets/svg/StyleColor';
import Create from '@tandem/assets/svg/CreateIcon';
import navigateTo from '@tandem/navigation/navigate';
import {SCREEN_NAME} from '@tandem/navigation/ComponentName';
import BackButton from '@tandem/assets/svg/LeftArrow';
import {verticalScale} from 'react-native-size-matters';
import {useAppDispatch, useAppSelector} from '@tandem/hooks/navigationHooks';
import RNScreenWrapper from '@tandem/components/RNScreenWrapper';
import {RootState, store} from '@tandem/redux/store';
import RNButton from '@tandem/components/RNButton';
import generateStory from '@tandem/api/generateStory';
import {STORY_PARTS} from '@tandem/constants/enums';
import {goBackInOrder} from '@tandem/functions/removeQuestionData';
import {useNavigation} from '@react-navigation/native';
import {
  Canvas,
  Circle,
  Group,
  Image,
  ImageShader,
  Skia,
  dist,
  makeImageFromView,
  mix,
  vec,
} from '@shopify/react-native-skia';
import {
  addSnapShot1,
  addSnapShot2,
} from '@tandem/redux/slices/animationSnapshots.slice';
import {
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import wait from '@tandem/functions/wait';
import Orientation from 'react-native-orientation-locker';
import lockOrientation from '@tandem/functions/lockOrientation';
import {Stats, updateChildStats} from '@tandem/redux/slices/createChild.slice';
import {setStoryGenTracking} from '@tandem/redux/slices/activityIndicator.slice';
import analytics from '@react-native-firebase/analytics';

const SCREEN = [
  SCREEN_NAME.GENERATE_STORY_WHAT_HAPPENS,
  SCREEN_NAME.GENERATE_STORY_WHO,
  SCREEN_NAME.GENERATE_STORY_INCLUSION,
  SCREEN_NAME.GENERATE_STORY_WHAT_THINGS,
  SCREEN_NAME.GENERATE_STORY_WHERE,
  SCREEN_NAME.GENERATE_STORY_ILLUSTRATIONS,
  SCREEN_NAME.GENERATE_STORY_COLORS,
];

const RNRoadmap = () => {
  const navigation: any = useNavigation();
  const [positionRefs, setPositionRefs] = React.useState({
    0: {height: 0, width: 0, x: 0, y: 0},
    1: {height: 0, width: 0, x: 0, y: 0},
    2: {height: 0, width: 0, x: 0, y: 0},
    3: {height: 0, width: 0, x: 0, y: 0},
    4: {height: 0, width: 0, x: 0, y: 0},
    5: {height: 0, width: 0, x: 0, y: 0},
    6: {height: 0, width: 0, x: 0, y: 0},
  });
  const storyGenerationResponse = useAppSelector(
    (state: RootState) => state.storyGeneration,
  );
  const snapshots = useAppSelector((state: RootState) => state.snapshotReducer);
  const isStoryGenTracking = useAppSelector(
    (state: RootState) => state.activityIndicator.isStoryGenTracking,
  );
  const currentChild = useAppSelector(
    (state: RootState) => state.createChild.currentChild,
  );
  const isTablet = useAppSelector(state => state.deviceType.isTablet);

  const [hightlightFirst, setHighlight] = React.useState(
    snapshots.snapShot1 !== null,
  );

  const portrait = useAppSelector(
    (state: RootState) => state.orientation.isPortrait,
  );
  let scale = portrait ? 1 : 1.4;

  const whatHappens = true;
  const who =
    storyGenerationResponse[STORY_PARTS.WHAT_HAPPENS].length > 0 ||
    storyGenerationResponse[STORY_PARTS.WHO].length > 0;
  const inclusion =
    (who && storyGenerationResponse[STORY_PARTS.WHO].length > 0) ||
    storyGenerationResponse[STORY_PARTS.INCLUSION] !== null;
  const whatThings =
    (inclusion && storyGenerationResponse[STORY_PARTS.INCLUSION] !== null) ||
    storyGenerationResponse[STORY_PARTS.WHAT_THINGS].length > 0;
  const where =
    (whatThings &&
      storyGenerationResponse[STORY_PARTS.WHAT_THINGS].length > 0) ||
    storyGenerationResponse[STORY_PARTS.WHERE].length > 0;
  const illustration =
    (where && storyGenerationResponse[STORY_PARTS.WHERE].length > 0) ||
    storyGenerationResponse[STORY_PARTS.STYLES].length > 0;
  const colors =
    illustration && storyGenerationResponse[STORY_PARTS.STYLES].length > 0;

  const checkIfClickable = [
    whatHappens,
    who,
    inclusion,
    whatThings,
    where,
    illustration,
    colors,
  ];
  console.log({
    whatHappens,
    who,
    inclusion,
    whatThings,
    where,
    illustration,
    colors,
    checkIfClickable,
  });

  const handleNavigate = (index: number) => {
    if (checkIfClickable[index]) {
      navigation.push(SCREEN[index]);
    }
  };

  const ref = React.useRef(null);

  const {width: wWidth, height: heightRef} = useWindowDimensions();
  const [hHeight, setHeight] = React.useState(
    heightRef + (StatusBar.currentHeight || 0),
  );
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    setHeight(heightRef + (StatusBar.currentHeight || 0));
  }, [heightRef]);

  React.useEffect(() => {
    lockOrientation();
    return () => {
      if (isTablet) {
        Orientation.unlockAllOrientations();
      }
    };
  }, [isTablet]);

  const outer = Skia.XYWHRect(0, 0, wWidth, hHeight);

  const saveSnapShot = async () => {
    const overlay = await makeImageFromView(ref);

    if (!checkIfClickable[2]) {
      // ! depending upon when .. the dispatched action will change
      dispatch(addSnapShot1(overlay));
      return;
    }
    if (checkIfClickable[6]) {
      dispatch(addSnapShot2(overlay));
    }
  };

  const circle = useSharedValue({x: 0, y: 0, r: 0});
  const transition = useSharedValue(0);
  const r = useDerivedValue(() => {
    return mix(transition.value, 0, circle.value.r);
  });

  const [zIndex, setZindex] = useState(-1);

  const performAnimation = async () => {
    setZindex(1);
    const y = positionRefs[1].y + verticalScale(120) / scale;
    const x = positionRefs[1].x + verticalScale(105) / scale;
    const corners = [
      vec(0, 0),
      vec(wWidth, 0),
      vec(wWidth, hHeight),
      vec(0, hHeight),
    ];
    const radius = Math.max(...corners.map(corner => dist(corner, {x, y})));
    circle.value = {x, y, r: radius};
    if (Platform.OS === 'android') {
      await wait(500);
    }
    await saveSnapShot();
    if (Platform.OS === 'android') {
      await wait(500);
    }
    transition.value = 0;
    transition.value = withTiming(1, {duration: 3000}, async () => {
      await wait(500);
      dispatch(addSnapShot1(null));
      dispatch(addSnapShot2(null));
      setZindex(-1);
    });
  };

  React.useEffect(() => {
    const begin = async () => {
      if (snapshots.snapShot1 !== null) {
        return;
      }
      await wait(200);
      await saveSnapShot();
      setHighlight(true);
    };
    begin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (isStoryGenTracking) {
      console.log('wont be calling this useEffect again');
      return;
    }
    // logic to calculate time spent reading story
    const timeSpent = () => {
      const stats: Stats = JSON.parse(
        JSON.stringify(
          store.getState().createChild.stats?.[currentChild.childId],
        ),
      );

      const timeAlreadyPast = stats?.generation?.totalTime || 0;
      // we will call this in an interval and add 5 sec to it
      // ! we want to foundation object ready by now in slice
      stats.generation.totalTime = timeAlreadyPast + 5;
      console.log(
        'current story generation time by child ',
        currentChild.childId,
        'is ',
        timeAlreadyPast + 5,
      );
      dispatch(
        updateChildStats({childId: currentChild.childId, stats: {...stats}}),
      );

      // calling timeSpent recursively after 5 seconds
    };
    // set someReduxState to true
    dispatch(setStoryGenTracking(true));
    const unsubscribe = setInterval(() => {
      timeSpent();
    }, 5000);
    return () => {
      clearInterval(unsubscribe);
      dispatch(setStoryGenTracking(false));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View ref={ref} collapsable={false} style={{flex: 1}}>
      <RNScreenWrapper style={styles.container}>
        <View collapsable={false} style={styles.header}>
          <RNButton
            onlyIcon
            icon={<BackButton />}
            onClick={() => {
              goBackInOrder();
            }}
          />
          <Pressable
            onPress={() => {
              navigateTo(SCREEN_NAME.ACCOUNT);
            }}>
            <YellowButton />
          </Pressable>
        </View>
        <View collapsable={false} style={[styles.roadmap]}>
          <Pressable
            collapsable={false}
            onLayout={event => {
              const layout = event.nativeEvent?.layout;
              LayoutAnimation.configureNext(
                LayoutAnimation.Presets.easeInEaseOut,
              );
              setPositionRefs(prev => ({
                ...prev,
                6: layout,
              }));
            }}
            style={[
              styles.create,
              {
                left: verticalScale(35) / scale,
                height: verticalScale(160) / scale,
                width: verticalScale(160) / scale,
                top: verticalScale(portrait ? -1 : 40),
              },
            ]}
            onPress={async () => {
              if (!checkIfClickable[6]) {
                return;
              }

              try {
                if (Platform.OS === 'ios') {
                  performAnimation();
                }
                await generateStory({
                  childId: currentChild.childId,
                  storyPromptData: storyGenerationResponse,
                });
                analytics().logEvent('newStoryGenerated', {
                  childId: currentChild.childId,
                  characters: JSON.stringify(
                    storyGenerationResponse.characters,
                  ),
                  childInStory: JSON.stringify(
                    storyGenerationResponse.childInStory,
                  ),
                  genre: JSON.stringify(storyGenerationResponse.genre),
                  illustrationStyle: JSON.stringify(
                    storyGenerationResponse.illustrationStyle,
                  ),
                  location: JSON.stringify(storyGenerationResponse.location),
                  plotElements: JSON.stringify(
                    storyGenerationResponse.plotElements,
                  ),
                });
              } catch (error) {
                console.log('error generating story', error);
              }
            }}>
            <Create scale={scale} mapIndex={!!checkIfClickable[6]} />
          </Pressable>
          {positionRefs[6].y !== 0 && (
            <Pressable
              collapsable={false}
              onLayout={event => {
                const layout = event.nativeEvent?.layout;
                LayoutAnimation.configureNext(
                  LayoutAnimation.Presets.easeInEaseOut,
                );
                setPositionRefs(prev => ({
                  ...prev,
                  5: layout,
                }));
              }}
              onPress={() => {
                handleNavigate(5);
              }}
              style={[
                styles.stylecolor,
                {
                  top: positionRefs[6].y + verticalScale(110) / scale,
                  left: positionRefs[6].x - verticalScale(83) / scale,
                },
              ]}>
              <StyleColor
                scale={scale}
                fillColor={
                  checkIfClickable[5]
                    ? themeColor.themeBlue
                    : themeColor.lightGray
                }
                textColor={
                  checkIfClickable[5] ? themeColor.white : themeColor.themeBlue
                }
              />
            </Pressable>
          )}
          {positionRefs[5].y !== 0 && (
            <Pressable
              collapsable={false}
              onLayout={event => {
                const layout = event.nativeEvent?.layout;
                LayoutAnimation.configureNext(
                  LayoutAnimation.Presets.easeInEaseOut,
                );
                setPositionRefs(prev => ({
                  ...prev,
                  4: layout,
                }));
              }}
              onPress={() => {
                handleNavigate(4);
              }}
              style={[
                styles.whatHappens,
                {
                  top: positionRefs[5].y + verticalScale(71.6) / scale,
                  left: positionRefs[5].x + verticalScale(81) / scale,
                },
              ]}>
              <Where
                scale={scale}
                fillColor={
                  checkIfClickable[4]
                    ? themeColor.lightGreen
                    : themeColor.lightGray
                }
                textColor={
                  checkIfClickable[4] ? themeColor.white : themeColor.themeBlue
                }
              />
            </Pressable>
          )}
          {positionRefs[4].y !== 0 && (
            <Pressable
              collapsable={false}
              onLayout={event => {
                const layout = event.nativeEvent?.layout;
                LayoutAnimation.configureNext(
                  LayoutAnimation.Presets.easeInEaseOut,
                );
                setPositionRefs(prev => ({
                  ...prev,
                  3: layout,
                }));
              }}
              onPress={() => {
                handleNavigate(3);
              }}
              style={[
                styles.whatThing,
                {
                  top: positionRefs[4].y + verticalScale(80) / scale,
                  left: positionRefs[4].x - verticalScale(102) / scale,
                },
              ]}>
              <WhatThing
                scale={scale}
                fillColor={
                  checkIfClickable[3] ? themeColor.gold : themeColor.lightGray
                }
                textColor={
                  checkIfClickable[3] ? themeColor.white : themeColor.themeBlue
                }
              />
            </Pressable>
          )}
          {positionRefs[3].y !== 0 && (
            <Pressable
              collapsable={false}
              onLayout={event => {
                const layout = event.nativeEvent?.layout;
                LayoutAnimation.configureNext(
                  LayoutAnimation.Presets.easeInEaseOut,
                );
                setPositionRefs(prev => ({
                  ...prev,
                  2: layout,
                }));
              }}
              onPress={() => {
                handleNavigate(1);
              }}
              style={[
                styles.where,
                {
                  top: positionRefs[3].y + verticalScale(96.5) / scale,
                  left: positionRefs[3].x + verticalScale(105) / scale,
                },
              ]}>
              <Who
                scale={scale}
                fillColor={
                  checkIfClickable[1] ? themeColor.green : themeColor.lightGray
                }
                textColor={
                  checkIfClickable[1] ? themeColor.white : themeColor.themeBlue
                }
              />
            </Pressable>
          )}
          {positionRefs[2].y !== 0 && (
            <Pressable
              collapsable={false}
              onLayout={event => {
                const layout = event.nativeEvent?.layout;
                LayoutAnimation.configureNext(
                  LayoutAnimation.Presets.easeInEaseOut,
                );
                setPositionRefs(prev => ({
                  ...prev,
                  1: layout,
                }));
              }}
              onPress={async () => {
                if (!hightlightFirst) {
                  return;
                }
                handleNavigate(0);
              }}
              style={[
                styles.who,
                {
                  top: positionRefs[2].y + verticalScale(76.5) / scale,
                  left: positionRefs[2].x - verticalScale(81) / scale,
                },
              ]}>
              <WhatHappens
                scale={scale}
                fillColor={hightlightFirst ? '#9A00FF' : themeColor.lightGray}
                textColor={
                  hightlightFirst ? themeColor.white : themeColor.themeBlue
                }
              />
            </Pressable>
          )}
          {positionRefs[1].y !== 0 && (
            <Pressable
              collapsable={false}
              onLayout={event => {
                const layout = event.nativeEvent?.layout;
                LayoutAnimation.configureNext(
                  LayoutAnimation.Presets.easeInEaseOut,
                );
                setPositionRefs(prev => ({
                  ...prev,
                  0: layout,
                }));
              }}
              style={[
                styles.start,
                {
                  top: positionRefs[1].y + verticalScale(120) / scale,
                  left: positionRefs[1].x + verticalScale(105) / scale,
                  height: verticalScale(80) / scale,
                  width: verticalScale(80) / scale,
                },
              ]}
              onPress={async () => {
                await saveSnapShot();
                handleNavigate(0);
              }}>
              <RNTextComponent
                style={[
                  styles.startText,
                  {fontSize: verticalScale(14) / scale},
                ]}
                isSemiBold>
                {translation('START')}
              </RNTextComponent>
            </Pressable>
          )}
        </View>
        <Canvas
          style={{
            height: hHeight,
            width: wWidth,
            position: 'absolute',
            zIndex,
          }}>
          {snapshots.snapShot1 && snapshots.snapShot2 && (
            <Group>
              <Image image={snapshots.snapShot1} rect={outer} fit="cover" />
              <Circle c={circle} r={r}>
                <ImageShader
                  image={snapshots.snapShot2}
                  rect={outer}
                  fit="cover"
                />
              </Circle>
            </Group>
          )}
        </Canvas>
      </RNScreenWrapper>
    </View>
  );
};

export default RNRoadmap;

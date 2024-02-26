import {View, Image, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {styles} from './styles';
import RNScreenWrapper from '@tandem/components/RNScreenWrapper';
import RNTextComponent from '@tandem/components/RNTextComponent';
import RNButton from '@tandem/components/RNButton';
import {SCREEN_NAME} from '@tandem/navigation/ComponentName';
import Back from '@tandem/assets/svg/LeftArrow';
import Options from '@tandem/assets/svg/ThreeDots';
import RNMenuModal from '@tandem/components/RNMenuModal';
import navigateTo from '@tandem/navigation/navigate';
import {verticalScale} from 'react-native-size-matters';
import {translation} from '@tandem/utils/methods';
import {useAppSelector} from '@tandem/hooks/navigationHooks';
import {MODE} from '@tandem/constants/mode';
import {useRoute} from '@react-navigation/native';
import {BooksData} from '../Bookshelf/interface';
import {store} from '@tandem/redux/store';
import {changeStoryLevel} from '@tandem/redux/slices/storyLevel.slice';

const Story = () => {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState({val: 0, len: 0});
  const [redirect] = useState(true);
  const mode = useAppSelector(state => state.mode.mode);
  const route: any = useRoute();
  const routeData: BooksData = route?.params?.routeData;
  const [thumbnail] = useState(routeData?.image || undefined);
  const [textArray, setTextArray] = React.useState<
    {text: string; img: string | null}[]
  >([]);
  const toggelMenuBar = () => {
    setVisible(!visible);
  };
  const {val, len} = progress;

  React.useEffect(() => {
    const f = async () => {
      const book = routeData.book;
      const images: string[] = JSON.parse(
        JSON.stringify(store.getState().bookShelf.images?.[book._id] || []),
      );
      const indexOfStoryComplexity = Math.floor(
        (book.storyInfo.length - 1) / 2,
      );
      store.dispatch(changeStoryLevel(indexOfStoryComplexity));
      images.shift(); // ! removing thumbnail image from book
      setProgress(prev => ({
        ...prev,
        len: book.storyInfo[indexOfStoryComplexity].pages.length,
        val: book.storyInfo[indexOfStoryComplexity].pages.length,
      }));
      const textArrayData = book.storyInfo[indexOfStoryComplexity].pages.map(
        (page, i) => ({
          text: page.text,
          img: images[i],
        }),
      );
      setTextArray(textArrayData);
    };
    f();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <RNScreenWrapper>
        <View style={styles.headerButtons}>
          <RNButton
            onlyIcon
            icon={<Back />}
            onClick={() => {
              navigateTo();
            }}
          />
          <RNButton onlyIcon icon={<Options />} onClick={() => {}} />
          <RNMenuModal visible={visible} renderModal={toggelMenuBar} />
        </View>

        <View style={styles.container}>
          <Image style={styles.poster} source={{uri: thumbnail}} />
          <View style={styles.scrollView}>
            <View style={styles.midContent}>
              {routeData.emogi && (
                <View style={styles.rating}>
                  <RNTextComponent style={styles.emoji}>
                    {routeData.emogi}
                  </RNTextComponent>
                </View>
              )}
              {routeData.isNew && (
                <View style={styles.duration}>
                  <RNTextComponent style={styles.new} isSemiBold>
                    {translation('NEW')}
                  </RNTextComponent>
                </View>
              )}
            </View>
            <ScrollView
              bounces
              contentContainerStyle={styles.scrollContainer}
              showsVerticalScrollIndicator={false}>
              <View style={styles.dateTime}>
                <RNTextComponent style={styles.date}>
                  {routeData.time}
                </RNTextComponent>
                <RNTextComponent
                  style={[styles.date, {color: 'rgba(0, 0, 0, 0.6)'}]}>
                  {`${routeData.readingTime} min reading`}
                </RNTextComponent>
              </View>
              <RNTextComponent isSemiBold style={styles.heading}>
                {routeData.headerTitle}
              </RNTextComponent>
              <RNTextComponent style={styles.story}>
                {routeData.teaser}
              </RNTextComponent>
            </ScrollView>
          </View>
          <RNButton
            title={
              mode === MODE.B
                ? translation('READ_TOGETHER')
                : translation('REREAD')
            }
            hitSlop={40}
            loadPercentage={(val * 100) / (len || 1)}
            customStyle={[styles.button]}
            textStyle={{fontSize: verticalScale(14)}}
            onClick={() => {
              navigateTo(SCREEN_NAME.STORY_TELLING, {
                id: routeData.id,
                readWithoutImages: !redirect,
                textArray: textArray,
                book: routeData.book,
              });
            }}
          />
        </View>
      </RNScreenWrapper>
    </>
  );
};

export default Story;

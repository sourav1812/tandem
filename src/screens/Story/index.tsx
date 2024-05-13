/* eslint-disable react-native/no-inline-styles */
import {View, Image, ScrollView, Pressable, Switch} from 'react-native';
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
import {
  changeStoryLevel,
  changeTextSize,
} from '@tandem/redux/slices/storyLevel.slice';
import themeColor from '@tandem/theme/themeColor';
import markBookAsArchived from '@tandem/api/markBookAsArchived';
import {setForceReload} from '@tandem/redux/slices/activityIndicator.slice';
import analytics from '@react-native-firebase/analytics';
import markBookAsPublic from '@tandem/api/markBookAsPublic';
import {updatePage} from '@tandem/redux/slices/bookShelf.slice';

const Story = () => {
  const [visible, setVisible] = useState(false);
  const [menu, setMenu] = useState(false);
  const [progress, setProgress] = useState({val: 0, len: 0});
  const [redirect] = useState(true);
  const mode = useAppSelector(state => state.mode.mode);
  const route: any = useRoute();
  const routeData: BooksData = route?.params?.routeData;
  const publicRoute: boolean = !!route?.params?.publicRoute;
  const [archive, setArchive] = useState(routeData.book.archived);
  const [publicBook, setPublicBook] = useState(
    !!routeData.book?.isPubliclyAvailable,
  );
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
      store.dispatch(updatePage(-1));
      const book = routeData.book;
      const images: string[] = JSON.parse(
        JSON.stringify(store.getState().bookShelf.images?.[book._id] || []),
      );
      const indexOfStoryComplexity = book.storyInfo.length - 1;
      store.dispatch(changeTextSize(2));
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
  const menuRenderItem = React.useCallback(() => {
    return (
      <Pressable
        onPress={() => {
          setMenu(false);
        }}
        style={{
          position: 'absolute',
          height: '100%',
          width: '100%',
          backgroundColor: '#000000c0',
        }}>
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 20,
            right: '6%',
            position: 'absolute',
            top: '13%',
            padding: 20,
            justifyContent: 'center',
            width: '65%',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <RNTextComponent style={{marginRight: 'auto'}}>
              Archive Story
            </RNTextComponent>
            <Switch
              trackColor={{false: '#474747', true: themeColor.green}}
              thumbColor={themeColor.white}
              ios_backgroundColor={'#474747'}
              onValueChange={async () => {
                // ! api req to toogle archive and update state
                try {
                  setArchive(!archive);
                  await markBookAsArchived(routeData.book._id, !archive);
                  store.dispatch(setForceReload(true));
                } catch (error) {
                  setArchive(archive);
                }
              }}
              value={archive}
            />
          </View>
          {routeData.book?.isPubliclyAvailable !== undefined && (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <RNTextComponent style={{marginRight: 'auto'}}>
                Make story public
              </RNTextComponent>
              <Switch
                trackColor={{false: '#474747', true: themeColor.green}}
                thumbColor={themeColor.white}
                ios_backgroundColor={'#474747'}
                onValueChange={async () => {
                  // ! api req to toogle archive and update state
                  try {
                    setPublicBook(!publicBook);
                    await markBookAsPublic(routeData.book._id, !publicBook);
                    store.dispatch(setForceReload(true));
                  } catch (error) {
                    setPublicBook(publicBook);
                  }
                }}
                value={publicBook}
              />
            </View>
          )}
        </View>
      </Pressable>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [archive, publicBook]);
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
          {!publicRoute && (
            <RNButton
              onlyIcon
              icon={<Options />}
              onClick={() => {
                setMenu(p => !p);
              }}
            />
          )}
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
                : translation('READ_A_STORY')
            }
            hitSlop={40}
            loadPercentage={(val * 100) / (len || 1)}
            customStyle={[styles.button]}
            textStyle={{fontSize: verticalScale(14)}}
            onClick={() => {
              analytics().logEvent('readBook', {
                bookId: routeData.book._id,
                childId: routeData.book.childId,
                bookTitle: routeData.book.title,
                userId: routeData.book.userId,
                isUserReadingPublicBook: publicRoute,
              });
              navigateTo(SCREEN_NAME.STORY_TELLING, {
                id: routeData.id,
                readWithoutImages: !redirect,
                textArray: textArray,
                book: routeData.book,
                publicRoute,
              });
            }}
          />
        </View>
        {menu && menuRenderItem()}
      </RNScreenWrapper>
    </>
  );
};

export default Story;

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
import {setImageForPage} from '@tandem/redux/slices/bookShelf.slice';
import RNFetchBlob from 'rn-fetch-blob';
import {CACHE_SESSION} from '@tandem/constants/local';

const Story = () => {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState({val: 0, len: 0});
  const [redirect, setRedirect] = useState(true);
  const mode = useAppSelector(state => state.mode.mode);
  const route: any = useRoute();
  const routeData: BooksData = route?.params?.routeData;
  const toggelMenuBar = () => {
    setVisible(!visible);
  };
  const {val, len} = progress;
  const shouldRedirect = () => {
    if (val && len) {
      if (val === len) {
        return true;
      }
    }
    return false;
  };

  React.useEffect(() => {
    setRedirect(shouldRedirect());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [val]);

  React.useEffect(() => {
    // routeData.id
    const books = store.getState().bookShelf.books;
    const bookIndex = books.findIndex(book => book.bookId === routeData.id);
    const book = books[bookIndex];
    const doWeHaveImage = book.pages.every(obj => obj.image);
    if (doWeHaveImage) {
      setRedirect(true);
      return;
    }
    setProgress(prev => ({...prev, len: book.pages.length}));
    book.pages.forEach((page, pageIndex) => {
      if (!page.image) {
        RNFetchBlob.config({fileCache: true})
          .fetch('GET', page.illustration_url, {})
          .then(res => {
            RNFetchBlob.session(CACHE_SESSION).add(res.path());
            store.dispatch(
              setImageForPage({
                bookIndex,
                pageIndex,
                image: 'file://' + res.path(),
              }),
            );
            setProgress(prev => ({...prev, val: prev.val + 1}));
          });
      }
    });
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
          <Image style={styles.poster} source={routeData?.image} />
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
            isDisabled={!redirect}
            title={
              mode === MODE.B
                ? translation('READ_TOGETHER')
                : translation('REREAD')
            }
            loadPercentage={redirect ? undefined : (val * 100) / (len || 1)}
            customStyle={[styles.button]}
            textStyle={{fontSize: verticalScale(14)}}
            onClick={() => {
              navigateTo(SCREEN_NAME.STORY_TELLING, {id: routeData.id});
            }}
          />
        </View>
      </RNScreenWrapper>
    </>
  );
};

export default Story;

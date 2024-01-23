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
import getIllustrations from '@tandem/api/getIllustrations';
import {setImagesForBook} from '@tandem/redux/slices/bookShelf.slice';
import {changeStoryLevel} from '@tandem/redux/slices/storyLevel.slice';
import RNFetchBlob from 'rn-fetch-blob';
import {addFlush} from '@tandem/redux/slices/cache.slice';

const Story = () => {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState({val: 0, len: 0});
  const [redirect] = useState(true);
  const mode = useAppSelector(state => state.mode.mode);
  const route: any = useRoute();
  const routeData: BooksData = route?.params?.routeData;
  const [thumbnail, setThumbnail] = useState(routeData?.image || undefined);
  const [textArray, setTextArray] = React.useState<
    {text: string; img: string | null}[]
  >([]);
  const toggelMenuBar = () => {
    setVisible(!visible);
  };
  const {val, len} = progress;

  // ! story book image caching is disabled until api is ready
  React.useEffect(() => {
    const f = async () => {
      const books = store.getState().bookShelf.books;
      const bookIndex = books.findIndex(book => book._id === routeData.id);
      const book = books[bookIndex];
      const images: string[] = JSON.parse(
        JSON.stringify(store.getState().bookShelf.images?.[book._id] || []),
      );
      const doWeHaveImage =
        images && images?.length > 0 && images.every(item => item !== null);
      const indexOfStoryComplexity = Math.floor(
        (book.storyInfo.length - 1) / 2,
      );
      store.dispatch(changeStoryLevel(indexOfStoryComplexity));
      if (doWeHaveImage) {
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
      } else {
        setProgress(prev => ({
          ...prev,
          len: book.storyInfo[indexOfStoryComplexity].pages.length,
          val: 0,
        }));
        const textArrayData = book.storyInfo[indexOfStoryComplexity].pages.map(
          page => ({
            text: page.text,
            img: null,
          }),
        );
        setTextArray(textArrayData);
        getIllustrations(book._id).then(async imagesData => {
          if (!imagesData || !imagesData.every(obj => obj.img_url)) {
            console.log('images still havent arrived');
            return;
          }
          // here do the caching work
          let dirs = RNFetchBlob.fs.dirs;
          const cachedImageObject: {page: number; path: string}[] =
            await Promise.all(
              imagesData.map(async (imageObject, index) => {
                const res = await RNFetchBlob.config({
                  fileCache: true,
                  path:
                    dirs.DocumentDir +
                    '/storybooks' +
                    book._id +
                    imageObject.page.toString() +
                    'cache',
                }).fetch('GET', imageObject.img_url, {});
                const pathLocal = res.path();
                store.dispatch(addFlush(pathLocal));
                if (index !== 0) {
                  setProgress(prev => ({
                    ...prev,
                    val: prev.val + 1,
                  }));
                }
                return {page: imageObject.page, path: 'file://' + pathLocal};
              }),
            );
          const cachedImage = cachedImageObject
            .sort((a, b) => a.page - b.page)
            .map(item => item.path);
          setThumbnail(cachedImage[0]);
          setTextArray(prev =>
            prev.map((item, indexOfTextArray) => ({
              ...item,
              img: cachedImage[indexOfTextArray + 1],
            })),
          );
          store.dispatch(
            setImagesForBook({bookId: book._id, images: cachedImage}),
          );
        });
      }
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
              });
            }}
          />
        </View>
      </RNScreenWrapper>
    </>
  );
};

export default Story;

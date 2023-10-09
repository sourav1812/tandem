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
// import {store} from '@tandem/redux/store';
// import {setImageForPage} from '@tandem/redux/slices/bookShelf.slice';
// import RNFetchBlob from 'rn-fetch-blob';
// import {addFlush} from '@tandem/redux/slices/cache.slice';

const Story = () => {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState({val: 0, len: 0});
  const [redirect, setRedirect] = useState(true);
  const mode = useAppSelector(state => state.mode.mode);
  const route: any = useRoute();
  const routeData: BooksData = route?.params?.routeData;
  const [textArray, setTextArray] = React.useState<
    {text: string; img: string | null}[]
  >([]);
  const toggelMenuBar = () => {
    setVisible(!visible);
  };
  const {val, len} = progress;
  // const shouldRedirect = () => {
  //   if (val && len) {
  //     if (val === len) {
  //       return true;
  //     }
  //   }
  //   return false;
  // };

  // React.useEffect(() => {
  //   setRedirect(shouldRedirect());
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [val]);

  // ! story book image caching is disabled until api is ready
  React.useEffect(() => {
    const f = async () => {
      const books = store.getState().bookShelf.books;
      const bookIndex = books.findIndex(book => book._id === routeData.id);
      const book = books[bookIndex];
      const doWeHaveImage =
        book.images &&
        book.images.length > 0 &&
        book.images.every(item => item !== null);

      if (doWeHaveImage) {
        const textArrayData = book.storyInfo[0].pages.map((page, i) => ({
          text: page.text,
          img: 'data:image/png;base64,' + book.images[i],
        }));
        setTextArray(textArrayData.reverse());
      } else {
        const textArrayData = book.storyInfo[0].pages.map(page => ({
          text: page.text,
          img: null,
        }));
        setTextArray(textArrayData.reverse());
        getIllustrations(book._id).then(images => {
          store.dispatch(setImagesForBook({bookIndex, images}));
        });
      }

      // if (doWeHaveImage) {
      //   // ! reset Directories if they are changed
      //   if (Platform.OS === 'ios') {
      //     const currentDirectory = RNFetchBlob.fs.dirs.DocumentDir;
      //     book.pages.forEach((page, pageIndex) => {
      //       if (!page.image?.includes(currentDirectory)) {
      //         store.dispatch(
      //           setImageForPage({
      //             bookIndex,
      //             pageIndex,
      //             image:
      //               'file://' +
      //               currentDirectory +
      //               page.image?.split('Documents')[1],
      //           }),
      //         );
      //       }
      //     });
      //   }
      //   setRedirect(true);
      //   return;
      // }
      // setProgress(prev => ({...prev, len: book.pages.length}));
      // let dirs = RNFetchBlob.fs.dirs;
      // book.pages.forEach((page, pageIndex) => {
      //   if (!page.image) {
      //     RNFetchBlob.config({
      //       fileCache: true,
      //       path:
      //         dirs.DocumentDir +
      //         '/storybooks' +
      //         book.bookId +
      //         pageIndex.toString() +
      //         'cache',
      //     })
      //       .fetch('GET', page.illustration_url, {})
      //       .then(res => {
      //         const pathLocal = res.path();
      //         store.dispatch(
      //           setImageForPage({
      //             bookIndex,
      //             pageIndex,
      //             image: 'file://' + pathLocal,
      //           }),
      //         );
      //         store.dispatch(addFlush(pathLocal));
      //         setProgress(prev => ({...prev, val: prev.val + 1}));
      //       })
      //       .catch(error => {
      //         console.log('error while caching story images', error);
      //       });
      //   }
      // });
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
            title={
              mode === MODE.B
                ? translation('READ_TOGETHER')
                : translation('REREAD')
            }
            hitSlop={40}
            loadPercentage={redirect ? undefined : (val * 100) / (len || 1)}
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

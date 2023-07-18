import {
  View,
  Image,
  Pressable,
  useWindowDimensions,
  ScrollView,
} from 'react-native';
import React from 'react';
import {styles} from './styles';
import RNScreenWrapper from '@tandem/components/RNScreenWrapper';
import {useOrientation} from '@tandem/hooks/useOrientation';
import RNTextComponent from '@tandem/components/RNTextComponent';
import themeColor from '@tandem/theme/themeColor';
import {verticalScale} from 'react-native-size-matters';
import RNBookmarkComponent from '@tandem/components/RNBookmarkComponent';
import {SCREEN_NAME} from '@tandem/navigation/ComponentName';
import {checkIfTablet} from '@tandem/hooks/isTabletHook';
import i18n from '@tandem/constants/lang/i18n';
import navigateTo from '@tandem/navigation/navigate';

const Home = () => {
  const portrait = useOrientation().isPortrait;
  const isTablet = checkIfTablet();
  const {width} = useWindowDimensions();
  const dummyData: {color: string; title: string}[] = [
    {color: themeColor.purple, title: i18n.t('I_CANT_DECIDE')},
    {color: themeColor.purple, title: i18n.t('I_CANT_DECIDE')},
    {color: themeColor.gold, title: i18n.t('LEARN_SOMETHING')},
    {color: themeColor.green, title: i18n.t('HAVE_FUN')},
    {color: themeColor.gold, title: i18n.t('LEARN_SOMETHING')},
    {color: themeColor.green, title: i18n.t('HAVE_FUN')},
  ];

  return (
    <RNScreenWrapper>
      <View style={[styles.container]}>
        <View
          style={[
            styles.header,
            {
              height: !portrait
                ? verticalScale(115)
                : isTablet
                ? verticalScale(115)
                : verticalScale(165),
            },
          ]}>
          <RNTextComponent
            isSemiBold
            style={{
              ...styles.heading,
              color: themeColor.white,
              marginTop:
                !isTablet && portrait ? verticalScale(60) : verticalScale(20),
            }}>
            {i18n.t('HELLO')}, Adam! 👋🏻
          </RNTextComponent>
          <View
            style={{
              width: '100%',
              backgroundColor: 'transparent',
              height: 25,
              position: 'absolute',
              bottom: -17,
              justifyContent: 'space-between',
              flexDirection: 'row',
              zIndex: 100,
            }}>
            <View
              style={{
                backgroundColor: themeColor.gold,
                width: (+width - verticalScale(80)) / 2,
                borderBottomRightRadius: 100,
                borderTopRightRadius: 100,
              }}
            />
            <View
              style={{
                backgroundColor: themeColor.gold,
                width: (+width - verticalScale(80)) / 2,
                borderBottomLeftRadius: 100,
                borderTopLeftRadius: 100,
              }}
            />
          </View>
          <View style={styles.profilePic}>
            <View
              style={{
                height: verticalScale(69),
                width: verticalScale(69),
                borderRadius: 100,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                style={{
                  height: verticalScale(59),
                  width: verticalScale(59),
                  borderRadius: 100,
                }}
                source={{
                  uri: 'https://static.vecteezy.com/system/resources/previews/016/461/449/non_2x/cute-giraffe-face-wild-animal-character-in-animated-cartoon-illustration-vector.jpg',
                }}
              />
            </View>
          </View>
        </View>
        <ScrollView
          style={styles.content}
          contentContainerStyle={{paddingTop: verticalScale(40)}}
          showsVerticalScrollIndicator={false}>
          <RNTextComponent
            isSemiBold
            style={{
              ...styles.heading,
              ...(!portrait && styles.headingPortrait),
              ...(isTablet && {fontSize: verticalScale(18)}),
            }}>
            {i18n.t('WHAT_SHALL_WE_DO_TODAY')}
          </RNTextComponent>
          <View
            style={{
              ...styles.options,
              ...(!portrait && styles.optionsPortrait),
              ...(isTablet && {paddingHorizontal: portrait ? 100 : 200}),
            }}>
            {dummyData.map((item, index) => (
              <Pressable
                onPress={() => {
                  if (index === 0) {
                    navigateTo(SCREEN_NAME.GENERATE_STORY);
                  } else {
                    // toggleModal();
                  }
                }}>
                <RNBookmarkComponent
                  customStyle={{
                    marginTop: verticalScale(24),
                    ...(!portrait && styles.cardPortrait),
                  }}
                  borderIconColor={item.color}
                  showIcon={index === 0}
                  heading={item.title}
                  subHeading={i18n.t('COMING_SOON')}
                />
              </Pressable>
            ))}
          </View>
        </ScrollView>
      </View>
    </RNScreenWrapper>
  );
};

export default Home;

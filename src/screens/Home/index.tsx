import {View, Image, Pressable} from 'react-native';
import React, {useState} from 'react';
import {styles} from './styles';
import RNScreenWrapper from '@tandem/components/RNScreenWrapper';
import {useOrientation} from '@tandem/hooks/useOrientation';
import RNTextComponent from '@tandem/components/RNTextComponent';
import themeColor from '@tandem/theme/themeColor';
import {scale, verticalScale} from 'react-native-size-matters';
import RNBookmarkComponent from '@tandem/components/RNBookmarkComponent';
import {COMPONENTSNAME} from '@tandem/navigation/ComponentName';
import RNReadingLevelModal from '@tandem/components/RNReadingLevelModal';
import {checkIfTablet} from '@tandem/hooks/isTabletHook';

const Home = ({navigation}: any) => {
  const portrait = useOrientation().isPortrait;
  const isTablet = checkIfTablet();

  const dummyData: {color: string; title: string}[] = [
    {color: themeColor.purple, title: "I can't decide"},
    {color: themeColor.purple, title: "I can't decide"},
    {color: themeColor.gold, title: 'Learn something'},
    {color: themeColor.green, title: 'Have fun'},
  ];

  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <RNScreenWrapper>
      <View style={styles.container}>
        <RNTextComponent
          isSemiBold
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            ...styles.heading,
            color: themeColor.white,
            position: 'absolute',
            top: portrait ? '7.8%' : '4%',
            ...(isTablet && {fontSize: scale(14), marginTop: verticalScale(0)}),
            ...(portrait && {alignSelf: 'center'}),
            ...(!portrait && {right: '10%'}),
            zIndex: 3,
          }}>
          Hello, Adam! 👋🏻
        </RNTextComponent>
        <View
          style={[
            styles.header,
            {...(!portrait && {height: verticalScale(100)})},
          ]}>
          <View style={styles.left} />
          <View style={styles.middle}>
            <Image
              source={{
                uri: 'https://static.vecteezy.com/system/resources/previews/016/461/449/non_2x/cute-giraffe-face-wild-animal-character-in-animated-cartoon-illustration-vector.jpg',
              }}
              style={{
                ...styles.profilePic,
                ...(!portrait && {top: '52%'}),
                ...(isTablet && {bottom: '-25%'}),
              }}
            />
          </View>
          <View style={styles.right} />
        </View>
        <View style={styles.content}>
          <RNTextComponent
            isSemiBold
            style={{
              ...styles.heading,
              ...(!portrait && styles.headingPortrait),
              ...(isTablet && {fontSize: scale(18)}),
            }}>
            What shall we do today?
          </RNTextComponent>
          <View
            style={{
              ...styles.options,
              ...(!portrait && styles.optionsPortrait),
              ...(isTablet && {maxWidth: 430}),
            }}>
            {dummyData.map((item, index) => (
              <Pressable
                onPress={() => {
                  if (index === 0) {
                    navigation.navigate(COMPONENTSNAME.GENERATE_STORY);
                  } else {
                    toggleModal();
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
                  subHeading="COMING SOON"
                />
              </Pressable>
            ))}
          </View>
        </View>
      </View>
      <RNReadingLevelModal
        visible={showModal}
        renderModal={toggleModal}
        nextClick={toggleModal}
      />
    </RNScreenWrapper>
  );
};

export default Home;

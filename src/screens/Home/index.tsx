import {View, Image} from 'react-native';
import React from 'react';
import {styles} from './styles';
import RNScreenWrapper from '../../components/RNScreenWrapper';
import {useOrientation} from '../../hooks/useOrientation';
import RNTextComponent from '../../components/RNTextComponent';
import themeColor from '../../theme/themeColor';
import {scale, verticalScale} from 'react-native-size-matters';
import RNBookmarkComponent from '../../components/RNBookmarkComponent';

const Home = () => {

  const portrait = useOrientation().isPortrait

  const dummyData: {color: string}[] = [
    {color: themeColor.purple},
    {color: themeColor.purple},
    {color: themeColor.gold},
    {color: themeColor.green},
  ];

  return (
    <RNScreenWrapper>
      <View style={styles.container}>
        <RNTextComponent
          isSemiBold
          style={{
            ...styles.heading,
            color: themeColor.white,
            position: 'absolute',
            top:  portrait ? '7.8%' : '4%',
            ...(portrait && { alignSelf: 'center'}),
            ...(!portrait && { right : '10%'}),
            zIndex: 3,
          }}>
          Hello, Adam! 👋🏻
        </RNTextComponent>
        <View style={[styles.header , {...(!portrait &&{ height: verticalScale(100)} )}]}>
          <View style={styles.left} />
          <View style={styles.middle}>
            <Image
              source={{
                uri: 'https://static.vecteezy.com/system/resources/previews/016/461/449/non_2x/cute-giraffe-face-wild-animal-character-in-animated-cartoon-illustration-vector.jpg',
              }}
              style={{...styles.profilePic , ...(!portrait && {top : '52%'})}}
            />
          </View>
          <View style={styles.right} />
        </View>
        <View style={styles.content}>
          <RNTextComponent isSemiBold style={{...styles.heading , ...(!portrait && styles.headingPortrait )}}>
            What shall we do today?
          </RNTextComponent>
          <View style={{...styles.options , ...(!portrait && styles.optionsPortrait ) }}>
            {dummyData.map((item, index) => (
              <RNBookmarkComponent
                customStyle={{marginTop: verticalScale(24), ...(!portrait && styles.cardPortrait )}}
                borderIconColor={item.color}
                showIcon={index == 0}
              />
            ))}
          </View>
        </View>
      </View>
    </RNScreenWrapper>
  );
};

export default Home;

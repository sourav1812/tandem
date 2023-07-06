import React, {useState} from 'react';
import RNScreenWrapper from '../../components/RNScreenWrapper';
import {styles} from './styles';
import {checkIfTablet} from '../../hooks/isTabletHook';
import {AccountProps} from '../../navigation/types';
import {View, Image, ScrollView, Pressable} from 'react-native';
import Logout from '../../assets/svg/Logout';
import RNButton from '../../components/RNButton';
import RNTextComponent from '../../components/RNTextComponent';
import en from '../../constants/api/lang/en';
import {verticalScale} from 'react-native-size-matters';
import RNKidsProfile from '../../components/RNKidsProfile';
import Add from '../../assets/svg/Add';
import RNParentProfile from '../../components/RNParentProfile';
import RNSignoutModal from '../../components/RNSignoutModal';
import {stateObject} from './interface';
import {COMPONENTSNAME} from '../../navigation/ComponentName';

const Account = ({navigation}: AccountProps) => {
  const isTablet = checkIfTablet();

  const [state, setState] = useState<stateObject>({
    signoutModal: false,
  });

  const {signoutModal} = state;

  const updateState = (date: any) => {
    setState((previouState: any) => {
      return {...previouState, ...date};
    });
  };

  const toggleSignOut = () => {
    updateState({signoutModal: !signoutModal});
  };

  return (
    <RNScreenWrapper style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../assets/png/logo.png')}
          resizeMode="contain"
          style={styles.logo}
        />
        <RNButton onlyIcon icon={<Logout />} onClick={toggleSignOut} />
      </View>
      <RNTextComponent
        isSemiBold
        style={[
          styles.heading,
          isTablet ? {fontSize: 24} : {fontSize: verticalScale(21)},
        ]}>
        {en.WHO_IS_USING_THE_APP_NEXT}
      </RNTextComponent>
      <View style={[styles.content, isTablet && {marginHorizontal: 120}]}>
        <View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            decelerationRate={'normal'}>
            {Array.from({length: 2}, () => (
              <RNKidsProfile />
            ))}
            <View style={styles.add2}>
              <Add />
              <RNTextComponent
                isMedium
                style={[styles.addText, {marginTop: verticalScale(20)}]}>
                {en.ADD}
              </RNTextComponent>
            </View>
          </ScrollView>
        </View>
        <Pressable
          style={styles.body}
          onPress={() => navigation.navigate(COMPONENTSNAME.BOTTOM_TAB)}>
          <RNKidsProfile />
          <RNParentProfile />
        </Pressable>
        <View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            decelerationRate={'normal'}>
            {Array.from({length: 2}, () => (
              <RNParentProfile />
            ))}
            <View style={styles.add}>
              <Add />
              <RNTextComponent isMedium style={styles.addText}>
                {en.ADD}
              </RNTextComponent>
            </View>
          </ScrollView>
        </View>
      </View>
      <RNSignoutModal
        visible={signoutModal}
        renderModal={toggleSignOut}
        nextClick={() => {
          navigation.navigate(COMPONENTSNAME.SELECT_LANGUAGE);
        }}
      />
    </RNScreenWrapper>
  );
};

export default Account;

/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import RNScreenWrapper from '@tandem/components/RNScreenWrapper';
import {styles} from './styles';
import {checkIfTablet} from '@tandem/hooks/isTabletHook';
import {AccountProps} from '@tandem/navigation/types';
import {View, Image, ScrollView, Pressable} from 'react-native';
import Logout from '@tandem/assets/svg/Logout';
import RNButton from '@tandem/components/RNButton';
import RNTextComponent from '@tandem/components/RNTextComponent';
import {verticalScale} from 'react-native-size-matters';
import RNKidsProfile from '@tandem/components/RNKidsProfile';
import Add from '@tandem/assets/svg/Add';
import RNParentProfile from '@tandem/components/RNParentProfile';
import RNSignoutModal from '@tandem/components/RNSignoutModal';
import {stateObject} from './interface';
import {COMPONENTSNAME} from '@tandem/navigation/ComponentName';
import i18n from '@tandem/constants/api/lang/i18n';

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
          isTablet ? {fontSize: 24} : {fontSize: verticalScale(20)},
        ]}>
        {i18n.t('WHO_IS_USING_THE_APP_NEXT')}
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
                {i18n.t('ADD')}
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
                {i18n.t('ADD')}
              </RNTextComponent>
            </View>
          </ScrollView>
        </View>
        <View style={styles.footer}>
          <RNTextComponent isSemiBold style={styles.text}>
            {' '}
            Start: Tandem{' '}
          </RNTextComponent>
          <Pressable
            style={styles.button}
            onPress={() => navigation.navigate(COMPONENTSNAME.BOTTOM_TAB)}>
            <Image
              source={{
                uri: 'https://thumbs.dreamstime.com/b/cute-giraffe-face-wild-animal-character-animated-cartoon-png-illustration-isolated-transparent-background-hand-drawn-png-264757481.jpg',
              }}
              style={styles.profile}
            />
          </Pressable>
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

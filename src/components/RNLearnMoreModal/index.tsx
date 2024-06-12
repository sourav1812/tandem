import {View, ScrollView} from 'react-native';
import React from 'react';
import {LearnMoreModal} from './interface';
import {styles} from './styles';
import RNTextComponent from '../RNTextComponent';
import RNModal from '../RNModal';
import RNButton from '../RNButton';
import {verticalScale} from 'react-native-size-matters';
import themeColor from '@tandem/theme/themeColor';
import {useAppSelector} from '@tandem/hooks/navigationHooks';

const LearnMore = ({visible, renderModal}: LearnMoreModal) => {
  let isTablet = useAppSelector(state => state.deviceType.isTablet);

  return (
    <RNModal
      visible={visible}
      customStyle={styles.modal}
      renderModal={renderModal}>
      <View
        style={[
          styles.container,
          isTablet && {
            width: verticalScale(260),
            alignSelf: 'center',
            padding: 24,
          },
        ]}>
        <RNTextComponent isSemiBold style={styles.heading}>
          LearnMore
        </RNTextComponent>
        <ScrollView>
          <RNTextComponent style={styles.info}>
            "content will be added by client"
          </RNTextComponent>
        </ScrollView>

        <View
          style={[styles.footerButton, isTablet && {paddingHorizontal: 40}]}>
          <RNButton
            onlyBorder
            buttonColor={themeColor.themeBlue}
            onClick={renderModal}
            title="Close"
            customStyle={[styles.button2, isTablet && {maxWidth: 150}]}
          />
          {/* <RNButton
            onClick={nextClick}
            title="No"
            customStyle={[styles.button2, isTablet && {maxWidth: 150}]}
          /> */}
        </View>
      </View>
    </RNModal>
  );
};

export default LearnMore;

import {View, Pressable} from 'react-native';
import React from 'react';
import {styles} from './styles';
import RNTextComponent from '../RNTextComponent';
import {verticalScale} from 'react-native-size-matters';
import RNModal from '../RNModal';
import {menuModalProps} from './interface';
import Notes from '../../assets/svg/Pdf';
import Send from '../../assets/svg/Send';
import Delete from '../../assets/svg/Delete';
import themeColor from '../../theme/themeColor';
import {useAppSelector} from '@tandem/hooks/navigationHooks';

const RNMenuModal = ({visible, renderModal}: menuModalProps) => {
  let isTablet = useAppSelector(state => state.deviceType.isTablet);
  return (
    <RNModal
      visible={visible}
      customStyle={styles.modal}
      renderModal={renderModal}>
      <View
        style={[styles.container, isTablet && {maxWidth: verticalScale(270)}]}>
        <Pressable style={styles.menu}>
          <RNTextComponent style={styles.text}>Share Pdf</RNTextComponent>
          <Notes />
        </Pressable>
        <Pressable style={styles.menu}>
          <RNTextComponent style={styles.text}>
            Invite to read on tandem
          </RNTextComponent>
          <Send />
        </Pressable>
        <Pressable style={styles.menu}>
          <RNTextComponent style={[styles.text, {color: themeColor.red}]}>
            Delete
          </RNTextComponent>
          <Delete />
        </Pressable>
      </View>
    </RNModal>
  );
};

export default RNMenuModal;

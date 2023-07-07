import {View, StatusBar} from 'react-native';
import React, {useState} from 'react';
import {readingTipsModalProps} from './interface';
import {styles} from './styles';
import RNTextComponent from '../RNTextComponent';
import {verticalScale} from 'react-native-size-matters';
import Modal from 'react-native-modal';
import RNButton from '../RNButton';
import Info from '../../assets/svg/Note';
import Less from '../../assets/svg/Subtract';
import More from '../../assets/svg/Plus';
import themeColor from '../../theme/themeColor';
import {checkIfTablet} from '../../hooks/isTabletHook';

const RNReadingLevelModal = ({
  visible = true,
  renderModal,
}: readingTipsModalProps) => {
  let isTablet = checkIfTablet();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [indicators, setIndicators] = useState([
    {color: themeColor.gold},
    {color: themeColor.gold},
    {color: themeColor.lightGreen},
    {color: themeColor.lightGray},
    {color: themeColor.lightGray},
    {color: themeColor.lightGray},
  ]);

  return (
    <Modal
      isVisible={visible}
      style={styles.modal}
      backdropOpacity={0.4}
      onBackButtonPress={renderModal}
      onBackdropPress={renderModal}>
      <StatusBar
        translucent
        backgroundColor={'rgba(0, 0, 0, 0.4)'}
        hidden={false}
        showHideTransition={'slide'}
      />
      <View
        style={[
          styles.container,
          isTablet && {width: verticalScale(270), alignSelf: 'center'},
        ]}>
        <Info style={styles.icon} />
        <RNTextComponent isSemiBold style={styles.heading}>
          Adjust the reading level:
        </RNTextComponent>
        <View style={styles.content}>
          <RNButton onlyIcon icon={<Less />} onClick={() => {}} />
          <View style={[styles.content]}>
            {indicators.map((item, index) => (
              <View
                style={[
                  styles.indicator,
                  {
                    height: verticalScale(12) + verticalScale(5.5) * index,
                    backgroundColor: item.color,
                  },
                ]}
              />
            ))}
          </View>
          <RNButton onlyIcon icon={<More />} onClick={() => {}} />
        </View>
        <RNButton
          title="Update"
          customStyle={styles.button}
          onClick={() => {}}
        />
      </View>
    </Modal>
  );
};

export default RNReadingLevelModal;

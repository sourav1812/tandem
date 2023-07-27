import {View} from 'react-native';
import React, {useState} from 'react';
import {readingTipsModalProps} from './interface';
import {styles} from './styles';
import RNTextComponent from '../RNTextComponent';
import {verticalScale} from 'react-native-size-matters';
import RNModal from '../RNModal';
import RNButton from '../RNButton';
import Info from '../../assets/svg/Note';
import Less from '../../assets/svg/Subtract';
import More from '../../assets/svg/Plus';
import themeColor from '../../theme/themeColor';
import i18n from '@tandem/constants/lang/i18n';
import {useAppSelector} from '@tandem/hooks/navigationHooks';

const RNReadingLevelModal = ({
  visible = true,
  renderModal,
}: readingTipsModalProps) => {
  let isTablet = useAppSelector(state => state.deviceType.isTablet);
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
    <RNModal
      visible={visible}
      customStyle={styles.modal}
      renderModal={renderModal}>
      <View
        style={[
          styles.container,
          isTablet && {width: verticalScale(270), alignSelf: 'center'},
        ]}>
        <Info style={styles.icon} />
        <RNTextComponent isSemiBold style={styles.heading}>
          {i18n.t('ADJUST_THE_READING_LEVEL')}:
        </RNTextComponent>
        <View style={styles.content}>
          <RNButton onlyIcon icon={<Less />} onClick={() => {}} />
          <View style={[styles.content]}>
            {indicators.map((item, index) => (
              <View
                key={index.toString()}
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
          title={i18n.t('UPDATE')}
          customStyle={styles.button}
          onClick={() => {}}
        />
      </View>
    </RNModal>
  );
};

export default RNReadingLevelModal;

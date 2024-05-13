import {View} from 'react-native';
import React from 'react';
import {ReadingTipsModalProps} from './interface';
import {styles} from './styles';
import RNTextComponent from '../RNTextComponent';
import {verticalScale} from 'react-native-size-matters';
import RNModal from '../RNModal';
import RNButton from '../RNButton';
import Less from '../../assets/svg/Subtract';
import More from '../../assets/svg/Plus';
import themeColor from '../../theme/themeColor';
import {useAppSelector} from '@tandem/hooks/navigationHooks';
import {translation} from '@tandem/utils/methods';
import {useDispatch} from 'react-redux';
import {changeStoryLevel} from '@tandem/redux/slices/storyLevel.slice';

const RNReadingLevelModal = ({
  visible = true,
  renderModal,
  setVissible,
  bookLength,
}: ReadingTipsModalProps) => {
  let isTablet = useAppSelector(state => state.deviceType.isTablet);
  const storyLevel = useAppSelector(state => state.storyLevel.level);
  const dispatch = useDispatch();
  const [level, setLevel] = React.useState<number>(storyLevel);
  const indicators = [
    {color: themeColor.gold},
    {color: themeColor.gold},
    {color: themeColor.lightGreen},
    {color: themeColor.lightGreen},
    {color: themeColor.red},
    {color: themeColor.red},
  ];
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
        {/* <Info style={styles.icon} /> */}
        <RNTextComponent isSemiBold style={styles.heading}>
          {translation('ADJUST_THE_READING_LEVEL')}:
        </RNTextComponent>
        <View style={styles.content}>
          <RNButton
            onlyIcon
            icon={<Less />}
            onClick={() => {
              if (level > 0) {
                setLevel(level - 1);
              }
            }}
          />
          <View style={[styles.content]}>
            {indicators.map((item, index) =>
              index >= bookLength ? null : (
                <View
                  key={index.toString()}
                  style={[
                    styles.indicator,
                    {
                      height: verticalScale(12) + verticalScale(5.5) * index,
                      backgroundColor:
                        level >= index ? item.color : themeColor.lightGray,
                    },
                  ]}
                />
              ),
            )}
          </View>
          <RNButton
            onlyIcon
            icon={<More />}
            onClick={() => {
              if (storyLevel < bookLength) {
                setLevel(level + 1);
              }
            }}
          />
        </View>
        <RNButton
          title={translation('UPDATE')}
          customStyle={styles.button}
          onClick={() => {
            let index = level;
            if (level > bookLength - 1) {
              index = bookLength - 1;
            }
            dispatch(changeStoryLevel(index));
            if (setVissible) {
              setVissible(false);
            }
          }}
        />
      </View>
    </RNModal>
  );
};

export default RNReadingLevelModal;

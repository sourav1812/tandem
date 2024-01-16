import {LayoutAnimation, Pressable, View} from 'react-native';
import React from 'react';
import {ratingList, ratingModalProps} from './interface';
import {styles} from './styles';
import RNTextComponent from '../RNTextComponent';
import {verticalScale} from 'react-native-size-matters';
import RNButton from '../RNButton';
import RNModal from '../RNModal';
import {useAppSelector} from '@tandem/hooks/navigationHooks';
import {translation} from '@tandem/utils/methods';
import themeColor from '@tandem/theme/themeColor';

const RNRatingModal = ({visible, renderModal, nextClick}: ratingModalProps) => {
  let isTablet = useAppSelector(state => state.deviceType.isTablet);
  const [rating, setRating] = React.useState(0);
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
        <RNTextComponent isSemiBold style={styles.heading}>
          {translation('AGREE_ON_A_RATING_FOR_THE_STORY')}:
        </RNTextComponent>
        <View style={styles.content}>
          {ratingList.map((item, index) => {
            return (
              <Pressable
                onPress={() => {
                  LayoutAnimation.configureNext(
                    LayoutAnimation.Presets.easeInEaseOut,
                  );
                  setRating(index + 1);
                }}
                key={index.toString()}
                style={[
                  styles.rateView,
                  {
                    backgroundColor:
                      rating === index + 1
                        ? themeColor.themeBlue
                        : themeColor.lightGray,
                  },
                ]}>
                <RNTextComponent style={styles.emoji}>
                  {item.name}
                </RNTextComponent>
              </Pressable>
            );
          })}
        </View>
        {rating !== 0 && (
          <RNButton
            customStyle={styles.button}
            onClick={() => {
              nextClick(rating);
            }}
            title={translation('RATE')}
          />
        )}
      </View>
    </RNModal>
  );
};

export default RNRatingModal;

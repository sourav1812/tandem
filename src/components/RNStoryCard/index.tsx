import { View, Image, ImageSourcePropType, Text } from 'react-native';
import React from 'react';
import { styles } from './styles';
import RNTextComponent from '../RNTextComponent';
import RightArrow from '../../assets/svg/RightArrow';
import { checkIfTablet } from '../../hooks/isTabletHook';
import { matrixTransform } from 'react-native-svg/lib/typescript/elements/Shape';
import { verticalScale } from 'react-native-size-matters';

const ProgressIndicator = ({ progress }: { progress: number }) => {
  const progressPercentage = `${progress * 10}%`;
  return (
    <View style={styles.progressIndicatorTop}>
      <View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          height: '100%',
          width: progressPercentage,
          backgroundColor: '#FEC247',
          borderRadius: 2,
        }}
      />
    </View>
  );
};
const RNStoryCard = ({
  item,
}: {
  item: {
    id: number;
    headerTitle: string;
    time: string;
    image: ImageSourcePropType;
    readingTime: number;
    isNew: boolean;
    emogi: string;
    week: string;
  };
}) => {

  const isTablet = checkIfTablet()

  return (
    <View style={styles.cardContainer}>
      <View style={styles.imageViewContainer}>
        <View style={styles.emojiTextContainer}>
          <View style={[styles.imageImojiContainer , (isTablet && {right : verticalScale(28) })]}>
            <Text style={styles.emojiText}>{'\u{1F60D}'}</Text>
          </View>
          <Image source={item.image} style={[styles.img ]} resizeMode='contain' />
          {item.isNew && (
            <View style={[styles.newTextComponentContainer , (isTablet && {width : '50%'} )]}>
              <RNTextComponent style={styles.newText} isSemiBold>
                New
              </RNTextComponent>
            </View>
          )}
        </View>
        <View style={[styles.headerTitleContainer , (isTablet && { maxWidth  :400 })]}>
          <RNTextComponent numberOfLines={2} isSemiBold style={styles.heading}>
            {item.headerTitle}
          </RNTextComponent>
          <RNTextComponent style={[styles.time, (isTablet  && {fontSize  : 22 })]}>{item.time}</RNTextComponent>
          <RNTextComponent style={[styles.minReading , (isTablet  && {fontSize  : 22 }) ]}>
            {`${10 - item.readingTime} min reading`}
          </RNTextComponent>
          <ProgressIndicator progress={item.readingTime} />
        </View>
      </View>
        <RightArrow />
    </View>
  );
};

export default RNStoryCard;

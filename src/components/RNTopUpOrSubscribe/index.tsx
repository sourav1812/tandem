import {View, Image} from 'react-native';
import React from 'react';
import RNScreenWrapper from '@tandem/components/RNScreenWrapper';
import {verticalScale} from 'react-native-size-matters';
import {styles} from './style';
import {useAppSelector} from '@tandem/hooks/navigationHooks';
import {RootState} from '@tandem/redux/store';
import RNButton from '@tandem/components/RNButton';
import Back from '../../assets/svg/LeftArrow';
import navigateTo from '@tandem/navigation/navigate';
import RNTextComponent from '@tandem/components/RNTextComponent';
import {Props} from './interface';
import {translation} from '@tandem/utils/methods';

const TopUpAndSubscribeHeader = ({children, title}: Props) => {
  const isTablet = useAppSelector(state => state.deviceType.isTablet);

  const portrait = useAppSelector(
    (state1: RootState) => state1.orientation.isPortrait,
  );
  return (
    <RNScreenWrapper style={styles.container}>
      <View
        style={[
          styles.header,
          {marginTop: portrait ? verticalScale(44) : verticalScale(20)},
        ]}>
        <View style={{flex: 1, zIndex: 100}}>
          <RNButton onlyIcon icon={<Back />} onClick={() => navigateTo()} />
        </View>
        <Image
          source={require('../../assets/png/logo.png')}
          resizeMode="contain"
          style={styles.logo}
        />
      </View>

      <RNTextComponent
        isSemiBold
        style={{
          textAlign: 'center',
          fontSize: verticalScale(24),
          marginVertical: 40,
        }}>
        {translation(title)}
      </RNTextComponent>
      {children}
    </RNScreenWrapper>
  );
};

export default TopUpAndSubscribeHeader;

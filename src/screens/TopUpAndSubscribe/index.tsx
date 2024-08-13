import {View, ScrollView} from 'react-native';
import React from 'react';
import {styles} from './style';
import navigateTo from '@tandem/navigation/navigate';
import {translation} from '@tandem/utils/methods';
import {MENU_ARRAY} from './interface';
import RNMenuButton from '@tandem/components/RNMenuButton';
import TopUpAndSubscribeHeader from '@tandem/components/RNTopUpOrSubscribe';
import {useAppSelector} from '@tandem/hooks/navigationHooks';

const TopUpAndSubscribe = () => {
  const products = useAppSelector(state => state.revenueCat.products);

  return (
    <TopUpAndSubscribeHeader title={'TOP_UP_AND_SUBSCRIPTION'}>
      <View style={styles.firstTab}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {MENU_ARRAY.map((item, index) => (
            <RNMenuButton
              key={index.toString()}
              isDisabled={index == 1}
              onPress={() => item.navigate && navigateTo(item.navigate)}
              isSemiBold
              title={`${translation(item.name)} ${products[0]?.priceString}`}
              customStyle={[styles.menu]}
            />
          ))}
        </ScrollView>
      </View>
    </TopUpAndSubscribeHeader>
  );
};

export default TopUpAndSubscribe;

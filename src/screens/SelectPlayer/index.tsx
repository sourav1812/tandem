import {View, ScrollView, Pressable} from 'react-native';
import React from 'react';
import {styles} from './styels';
import RNScreenWrapper from '@tandem/components/RNScreenWrapper';
import Back from '@tandem/assets/svg/Cross';
import RNButton from '@tandem/components/RNButton';
import RNTextComponent from '@tandem/components/RNTextComponent';
import themeColor from '@tandem/theme/themeColor';
import {player} from './interface';
import {SCREEN_NAME} from '@tandem/navigation/ComponentName';
import navigateTo from '@tandem/navigation/navigate';
import {useAppSelector} from '@tandem/hooks/navigationHooks';
import {translation} from '@tandem/utils/methods';

const SelectPlayer = () => {
  const players: player[] = [
    {name: 'Alysa', color: themeColor.gold},
    {name: 'Kashish', color: themeColor.lightGreen},
  ];
  const isTablet = useAppSelector(state => state.deviceType.isTablet);

  return (
    <RNScreenWrapper style={styles.container}>
      <RNButton icon={<Back />} onlyIcon onClick={() => navigateTo()} />
      <RNTextComponent isSemiBold style={styles.heading}>
        {translation('WHO_IS_GOING_TO')}
      </RNTextComponent>
      <View style={[styles.scrollViewParent, isTablet && {maxWidth: 500}]}>
        <ScrollView
          contentContainerStyle={styles.scrollView}
          showsVerticalScrollIndicator={false}>
          {players.map((item, index) => (
            <Pressable
              key={index.toString()}
              style={[styles.players, {backgroundColor: item.color}]}
              onPress={() => {
                navigateTo(SCREEN_NAME.BOOKSHELF);
              }}
            />
          ))}
        </ScrollView>
      </View>
    </RNScreenWrapper>
  );
};

export default SelectPlayer;

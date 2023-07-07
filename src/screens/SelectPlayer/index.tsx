import {View, ScrollView, Pressable} from 'react-native';
import React from 'react';
import {styles} from './styels';
import RNScreenWrapper from '@tandem/components/RNScreenWrapper';
import Back from '@tandem/assets/svg/Cross';
import RNButton from '@tandem/components/RNButton';
import {SelectPlayerScreenProps} from '@tandem/navigation/types';
import RNTextComponent from '@tandem/components/RNTextComponent';
import en from '@tandem/constants/api/lang/en';
import themeColor from '@tandem/theme/themeColor';
import {player} from './interface';
import {COMPONENTSNAME} from '@tandem/navigation/ComponentName';
import {checkIfTablet} from '@tandem/hooks/isTabletHook';

const SelectPlayer = ({navigation}: SelectPlayerScreenProps) => {
  const players: player[] = [
    {name: 'Alysa', color: themeColor.gold},
    {name: 'Kashish', color: themeColor.lightGreen},
  ];
  const isTablet = checkIfTablet();

  return (
    <RNScreenWrapper style={styles.container}>
      <RNButton icon={<Back />} onlyIcon onClick={() => navigation.goBack()} />
      <RNTextComponent isSemiBold style={styles.heading}>
        {en.WHO_IS_GOING_TO}
      </RNTextComponent>

      <View style={[styles.scrollViewParent, isTablet && {maxWidth: 500}]}>
        <ScrollView
          contentContainerStyle={styles.scrollView}
          showsVerticalScrollIndicator={false}>
          {players.map(item => (
            <Pressable
              style={[styles.players, {backgroundColor: item.color}]}
              onPress={() => {
                navigation.navigate(COMPONENTSNAME.BOOKSHELF);
              }}
            />
          ))}
        </ScrollView>
      </View>
    </RNScreenWrapper>
  );
};

export default SelectPlayer;

/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {styles} from './styles';
import RNScreenWrapper from '@tandem/components/RNScreenWrapper';
import {PeopleScreenProps} from '@tandem/navigation/types';
import {menuArray, stateObject} from './interface';
import BlueButton from '@tandem/assets/svg/BlueButton';
import RNButton from '@tandem/components/RNButton';
import {Pressable, View} from 'react-native';
import themeColor from '@tandem/theme/themeColor';
import {translation} from '@tandem/utils/methods';
import RNTextComponent from '@tandem/components/RNTextComponent';
import RNMenuButton from '@tandem/components/RNMenuButton';
import navigateTo from '@tandem/navigation/navigate';
// import {checkIfTablet} from '@tandem/hooks/isTabletHook';

const People = ({}: PeopleScreenProps) => {
  // const isTablet = checkIfTablet();

  const [state, setState] = useState<stateObject>({
    firstTab: false,
  });

  const {firstTab} = state;

  const updateState = (date: any) => {
    setState((previouState: any) => {
      return {...previouState, ...date};
    });
  };

  const leftTab = () => {
    updateState({firstTab: false});
  };

  const rightTab = () => {
    updateState({firstTab: true});
  };

  return (
    <RNScreenWrapper style={styles.container}>
      <BlueButton style={styles.button} />
      <View style={styles.customTab}>
        <RNButton
          title={translation('BIG_PEOPLE')}
          onlyBorder
          onClick={leftTab}
          customStyle={[
            styles.tab,
            !firstTab
              ? {
                  borderWidth: 0,
                  borderBottomWidth: 2,
                  borderBottomColor: themeColor.themeBlue,
                }
              : {borderWidth: 0},
          ]}
          textStyle={{
            fontWeight: '600',
            fontSize: 17,
            color: !firstTab ? themeColor.themeBlue : 'rgba(2, 4, 8, 0.6)',
          }}
        />
        <RNButton
          title={translation('LITTLE_PEOPLE')}
          onlyBorder
          onClick={rightTab}
          customStyle={[
            styles.tab,
            firstTab
              ? {
                  borderWidth: 0,
                  borderBottomWidth: 2,
                  borderBottomColor: themeColor.themeBlue,
                }
              : {borderWidth: 0},
          ]}
          textStyle={{
            fontWeight: '600',
            fontSize: 17,
            color: firstTab ? themeColor.themeBlue : 'rgba(2, 4, 8, 0.6)',
          }}
        />
      </View>
      {!firstTab && (
        <>
          <View style={styles.profile} />
          <RNTextComponent style={styles.name} isSemiBold>
            Ella
          </RNTextComponent>
          {menuArray.map(item => (
            <Pressable
              onPress={() => item.navigate && navigateTo(item.navigate)}>
              <RNMenuButton title={item.name} customStyle={styles.menu} />
            </Pressable>
          ))}
        </>
      )}
    </RNScreenWrapper>
  );
};

export default People;

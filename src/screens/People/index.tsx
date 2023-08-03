/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {styles} from './styles';
import RNScreenWrapper from '@tandem/components/RNScreenWrapper';
import {PeopleScreenProps} from '@tandem/navigation/types';
import {menuArray, StateObject} from './interface';
import BlueButton from '@tandem/assets/svg/BlueButton';
import RNButton from '@tandem/components/RNButton';
import {Pressable, ScrollView, View} from 'react-native';
import themeColor from '@tandem/theme/themeColor';
import {translation} from '@tandem/utils/methods';
import RNTextComponent from '@tandem/components/RNTextComponent';
import RNMenuButton from '@tandem/components/RNMenuButton';
import navigateTo from '@tandem/navigation/navigate';
import RNAddComponent from '@tandem/components/RNAddComponent';
import {verticalScale} from 'react-native-size-matters';
import {SCREEN_NAME} from '@tandem/navigation/ComponentName';
import {useAppSelector} from '@tandem/hooks/navigationHooks';

const People = ({}: PeopleScreenProps) => {
  const isTablet = useAppSelector(state => state.deviceType.isTablet);

  const [state, setState] = useState<StateObject>({
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
      <Pressable
        onPress={() => {
          navigateTo(SCREEN_NAME.ACCOUNT);
        }}>
        <BlueButton style={styles.button} />
      </Pressable>

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
      {!firstTab ? (
        <>
          <View style={styles.bigpeople}>
            <View>
              <View style={styles.profile} />
              <RNTextComponent style={styles.name} isSemiBold>
                Ella
              </RNTextComponent>
            </View>
            <Pressable onPress={() => {}}>
              <RNAddComponent
                customStyle={styles.addButton}
                boxStyle={styles.addBox}
              />
            </Pressable>
          </View>
          <View style={styles.firstTab}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {menuArray.map((item, index) => (
                <Pressable
                  key={index.toString()}
                  onPress={() =>
                    item.navigate &&
                    navigateTo(
                      item.navigate,
                      item.param && {fromPeople: item.param},
                    )
                  }>
                  <RNMenuButton
                    title={item.name}
                    customStyle={[
                      styles.menu,
                      isTablet && {marginHorizontal: 36},
                    ]}
                  />
                </Pressable>
              ))}
            </ScrollView>
          </View>
        </>
      ) : (
        <>
          <View style={styles.littlePeople}>
            <ScrollView contentContainerStyle={styles.scrollview}>
              <Pressable
                onPress={() => {
                  navigateTo(SCREEN_NAME.EditChildProfile);
                }}>
                <View
                  style={[
                    styles.profile,
                    isTablet && {
                      height: verticalScale(94),
                      width: verticalScale(94),
                    },
                  ]}
                />
                <RNTextComponent style={styles.name} isSemiBold>
                  Ella
                </RNTextComponent>
              </Pressable>
              <Pressable
                onPress={() => {
                  navigateTo(SCREEN_NAME.CREATE_CHILD_PROFILE);
                }}>
                <RNAddComponent
                  customStyle={styles.addButton}
                  boxStyle={styles.addBox}
                  textStyle={styles.addText}
                />
              </Pressable>
            </ScrollView>
          </View>
        </>
      )}
    </RNScreenWrapper>
  );
};

export default People;

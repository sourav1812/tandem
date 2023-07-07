import {View} from 'react-native';
import React from 'react';
import {styles} from './styles';
import RNScreenWrapper from '@tandem/components/RNScreenWrapper';
import RNButton from '@tandem/components/RNButton';
import {PeopleScreenProps} from '@tandem/navigation/types';
import {useAppDispatch, useAppSelector} from '@tandem/hooks/navigationHooks';
import {changeMode} from '@tandem/redux/slices/mode.slice';
import {COMPONENTSNAME} from '@tandem/navigation/ComponentName';

const People = ({navigation}: PeopleScreenProps) => {
  const dispatch = useAppDispatch();
  const mode = useAppSelector(state => state.mode.mode);

  console.log(mode);

  return (
    <RNScreenWrapper>
      <View style={styles.container}>
        <RNButton
          title="Switch Mode"
          onClick={() => {
            if (mode === 'bmode') {
              dispatch(changeMode('cmode'));
            } else {
              dispatch(changeMode('bmode'));
              setTimeout(() => {
                navigation.navigate(COMPONENTSNAME.SELECT_PLAYER);
              }, 2000);
            }
          }}
        />
      </View>
    </RNScreenWrapper>
  );
};

export default People;

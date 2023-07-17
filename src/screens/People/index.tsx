import {View} from 'react-native';
import React from 'react';
import {styles} from './styles';
import RNScreenWrapper from '@tandem/components/RNScreenWrapper';
import RNButton from '@tandem/components/RNButton';
import {useAppDispatch, useAppSelector} from '@tandem/hooks/navigationHooks';
import {changeMode} from '@tandem/redux/slices/mode.slice';
import {SCREEN_NAME} from '@tandem/navigation/ComponentName';
import {scale} from 'react-native-size-matters';
import navigateTo from '@tandem/navigation/navigate';
import {MODE} from '@tandem/constants/mode';

const People = () => {
  const dispatch = useAppDispatch();
  const mode = useAppSelector(state => state.mode.mode);

  console.log(mode);

  return (
    <RNScreenWrapper>
      <View style={styles.container}>
        <RNButton
          title="Switch Mode"
          customStyle={{paddingHorizontal: scale(20)}}
          onClick={() => {
            if (mode === MODE.B) {
              dispatch(changeMode(MODE.C));
            } else {
              dispatch(changeMode(MODE.B));
              setTimeout(() => {
                navigateTo(SCREEN_NAME.SELECT_PLAYER);
              }, 2000);
            }
          }}
        />
      </View>
    </RNScreenWrapper>
  );
};

export default People;

import React from 'react';
import GenerateStory from '../..';
import RNChooseColor from '@tandem/components/RNChooseColor';
import {scale} from 'react-native-size-matters';
import {useAppSelector} from '@tandem/hooks/navigationHooks';
import {TOOLTIP} from '@tandem/constants/local';
import {getValueFromKey, storeKey} from '@tandem/helpers/encryptedStorage';
import {SCREEN_NAME} from '@tandem/navigation/ComponentName';
import navigateTo from '@tandem/navigation/navigate';

export default () => {
  const [disabled, setDisabled] = React.useState(true);
  const isTablet = useAppSelector(state => state.deviceType.isTablet);
  const tooltipArray = getValueFromKey(TOOLTIP);
  const [tooltipThird, setTooltipThird] = React.useState(
    !tooltipArray.includes(7),
  );
  const onCloseThirdTooltip = () => {
    setTooltipThird(false);
    tooltipArray.push(7);
    storeKey(TOOLTIP, tooltipArray);
  };
  return (
    <GenerateStory
      questionNumber={7}
      onNextQuestion={() => {
        navigateTo(SCREEN_NAME.ROADMAP);
      }}
      disabled={disabled}>
      <RNChooseColor
        setDisabled={setDisabled}
        isTablet={isTablet}
        tooltipVisible={tooltipThird}
        onTooltipClose={onCloseThirdTooltip}
        customStyle={{paddingHorizontal: scale(16)}}
      />
    </GenerateStory>
  );
};

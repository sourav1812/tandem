import themeColor from '@tandem/theme/themeColor';
import React, {useState, useEffect} from 'react';
import {verticalScale} from 'react-native-size-matters';
import RNTextComponent from '../RNTextComponent';
import styles from './styles';
import {useAppSelector} from '@tandem/hooks/navigationHooks';

const TimerButton = ({
  setIsTimerFinished,
}: {
  setIsTimerFinished: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const isTablet = useAppSelector(state => state.deviceType.isTablet);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    if (timeLeft <= 0) {
      setIsTimerFinished(true);
      clearTimeout(timer);
    }
    return () => clearTimeout(timer);
  }, [setIsTimerFinished, timeLeft]);

  return (
    <RNTextComponent
      style={[
        styles.subHeading,
        {
          fontSize: isTablet ? verticalScale(11) : verticalScale(13),
          marginTop: verticalScale(10),
          color: themeColor.themeBlue,
        },
      ]}>
      {` ${timeLeft.toString()}s`}
    </RNTextComponent>
  );
};

export default TimerButton;

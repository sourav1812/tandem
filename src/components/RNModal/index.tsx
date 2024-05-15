import {Pressable, Dimensions} from 'react-native';
import React, {useEffect} from 'react';
import {RNModalProps} from './interface';
import {styles} from './styles';
import Animated, {useSharedValue, withTiming} from 'react-native-reanimated';

const RNModal = ({
  visible = true,
  renderModal,
  children,
  customStyle,
}: RNModalProps) => {
  const opacity = useSharedValue(0);
  const height = Dimensions.get('screen').height;
  const width = Dimensions.get('screen').width;

  useEffect(() => {
    if (visible) {
      fadeIn();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    opacity.value = withTiming(1, {duration: 400});
  };

  return (
    <>
      {visible ? (
        <Animated.View
          style={[
            styles.container,
            {
              height: height,
              width: width,
            },
            customStyle && customStyle,
            {opacity: opacity},
          ]}>
          <Pressable style={styles.offset} onPress={renderModal} />
          {children}
          <Pressable style={styles.offset} onPress={renderModal} />
        </Animated.View>
      ) : null}
    </>
  );
};

export default RNModal;

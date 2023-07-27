import {Pressable, Animated, Dimensions} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {RNModalProps} from './interface';
import {styles} from './styles';
import {RootState} from '@tandem/redux/store';
import {useSelector} from 'react-redux';

const RNModal = ({
  visible = true,
  renderModal,
  children,
  customStyle,
}: RNModalProps) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const portrait = useSelector(
    (state: RootState) => state.orientation.isPortrait,
  );
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
    Animated.timing(opacity, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  };

  // const fadeOut = () => {
  //   // Will change fadeAnim value to 0 in 3 seconds
  //   Animated.timing(opacity, {
  //     toValue: 0,
  //     duration: 500,
  //     useNativeDriver: true,
  //   }).start();
  // };

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

import {Pressable, Dimensions, View, LayoutAnimation} from 'react-native';
import React from 'react';
import {RNModalProps} from './interface';
import {styles} from './styles';

const RNModal = ({
  visible = true,
  renderModal,
  children,
  customStyle,
}: RNModalProps) => {
  const height = Dimensions.get('screen').height;
  const width = Dimensions.get('screen').width;

  React.useLayoutEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [visible]);

  if (!visible) {
    return null;
  }
  return (
    <View
      style={[
        styles.container,
        {
          height: height,
          width: width,
        },
        customStyle && customStyle,
      ]}>
      <Pressable style={styles.offset} onPress={renderModal} />
      {children}
      <Pressable style={styles.offset} onPress={renderModal} />
    </View>
  );
};

export default RNModal;

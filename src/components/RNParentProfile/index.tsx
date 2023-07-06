import {View, Image} from 'react-native';
import React from 'react';
import {styles} from './styles';
import RNTextComponent from '../RNTextComponent';

const RNParentProfile = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.profile}
        source={{
          uri: 'https://www.shutterstock.com/image-vector/cute-bear-face-cartoon-isolated-260nw-633787085.jpg',
        }}
      />
      <RNTextComponent style={styles.name} isMedium>
        Dad
      </RNTextComponent>
    </View>
  );
};

export default RNParentProfile;

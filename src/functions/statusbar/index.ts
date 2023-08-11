import {Platform, StatusBar} from 'react-native';

export default (statusColor?: string) => {
  if (Platform.OS === 'android') {
    StatusBar.pushStackEntry({
      translucent: true,
      showHideTransition: 'slide',
      backgroundColor: statusColor || 'transparent',
      barStyle: 'dark-content',
      hidden: false,
    });
  }
};

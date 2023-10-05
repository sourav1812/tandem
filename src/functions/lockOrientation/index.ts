import {store} from '@tandem/redux/store';
import Orientation, {OrientationType} from 'react-native-orientation-locker';

export default () => {
  Orientation.getOrientation(orientation => {
    const isTablet = store.getState().deviceType.isTablet;
    if (isTablet) {
      if (orientation === OrientationType.PORTRAIT) {
        Orientation.lockToPortrait();
      } else if (orientation === OrientationType['LANDSCAPE-RIGHT']) {
        Orientation.lockToLandscapeRight();
      } else if (orientation === OrientationType['LANDSCAPE-LEFT']) {
        Orientation.lockToLandscapeLeft();
      }
    }
  });
};

import {useState, useEffect} from 'react';
import DeviceInfo from 'react-native-device-info';

export const checkIfTablet = () => {
  const [isTabletCheck, setIsTabletCheck] = useState(false);

  useEffect(() => {
    const isIpad = DeviceInfo.getSystemName() === 'iPadOS' ? true : false;
    const isAndroidTablet = DeviceInfo.isTablet();
    setIsTabletCheck(isIpad || isAndroidTablet ? true : false);
  }, []);
  return isTabletCheck;
};

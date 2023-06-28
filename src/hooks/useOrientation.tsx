import {useState, useEffect} from 'react';
import {Dimensions} from 'react-native';


export const useOrientation = () => {
  const [screenInfo, setScreenInfo] = useState<any>(Dimensions.get('screen'));

  useEffect(() => {
    const onChange = (result: any) => {
      setScreenInfo(result.screen);
    };

    Dimensions.addEventListener('change', onChange);
  }, []);

  return {
    ...screenInfo,
    isPortrait: screenInfo.height > screenInfo.width,
  };
};

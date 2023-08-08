import {changeOrientation} from '@tandem/redux/slices/orientation.slice';
import {store} from '@tandem/redux/store';
import {useEffect} from 'react';
import {Dimensions} from 'react-native';

export const useOrientation = () => {
  useEffect(() => {
    Dimensions.addEventListener('change', onChange);
  }, []);
};

const onChange = (result: any) => {
  const screenInfo = result.screen;
  store.dispatch(changeOrientation(screenInfo.height > screenInfo.width));
};

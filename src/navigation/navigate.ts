import React from 'react';
import {NavigationContainerRef, CommonActions} from '@react-navigation/native';

export const navigationRef = React.createRef<NavigationContainerRef<any>>();

interface NavigationParameters {
  [key: string]: any;
}

const navigateTo = (
  routeName?: any,
  params: NavigationParameters = {},
  resetStack = false,
  addDelay = true,
) => {
  const navigation = navigationRef.current;
  setTimeout(
    () => {
      if (routeName) {
        if (resetStack) {
          const resetAction = CommonActions.reset({
            index: 0,
            routes: [{name: routeName, params}],
          });
          return navigation?.dispatch(resetAction);
        }
        return navigation?.navigate(routeName, params);
      }
      return navigation?.goBack();
    },
    addDelay ? 350 : 0,
  );
};

export default navigateTo;

import {SCREEN_NAME} from '@tandem/navigation/ComponentName';
import navigateTo from '@tandem/navigation/navigate';
import {store} from '@tandem/redux/store';

export default () => {
  const notificationScreenPermissions = store.getState().permissions;
  navigateTo(SCREEN_NAME.BOTTOM_TAB);
  navigateTo(
    !notificationScreenPermissions.isFirstTime ||
      notificationScreenPermissions.notificationStatus
      ? SCREEN_NAME.BOOKSHELF
      : SCREEN_NAME.NOTIFICATION_SCREEN,
  );
};

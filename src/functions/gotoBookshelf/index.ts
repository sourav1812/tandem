import {SCREEN_NAME} from '@tandem/navigation/ComponentName';
import navigateTo from '@tandem/navigation/navigate';
import {saveCurrentChild} from '@tandem/redux/slices/createChild.slice';
import {store} from '@tandem/redux/store';

const gotoBookshelf = () => {
  const notificationScreenPermissions = store.getState().permissions;
  navigateTo(SCREEN_NAME.BOTTOM_TAB);
  setTimeout(() => {
    navigateTo(
      !notificationScreenPermissions.isFirstTime ||
        notificationScreenPermissions.notificationStatus
        ? SCREEN_NAME.BOOKSHELF
        : SCREEN_NAME.NOTIFICATION_SCREEN,
    );
  }, 100);
};

export const changeChildAndNavigate = (childId: string) => {
  const children = store.getState().createChild.childList;
  const child = children.find(item => item.childId === childId);
  store.dispatch(saveCurrentChild(child));
  gotoBookshelf();
};

export default gotoBookshelf;

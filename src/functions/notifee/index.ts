import notifee, {TimestampTrigger, TriggerType} from '@notifee/react-native';
import {NOTIFICATION_PROMPTS} from '@tandem/constants/local';
import {store} from '@tandem/redux/store';
import {PermissionsAndroid, Platform} from 'react-native';

export const askPermissionNotifee = async () => {
  if (Platform.OS === 'ios') {
    await notifee.requestPermission();
  } else if (Platform.OS === 'android') {
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
  }
};
async function onDisplayNotification() {
  // Request permissions (required for iOS)

  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });

  // Display a notification
  await notifee.displayNotification({
    title: 'Notification Title',
    body: 'Main body content of the notification',
    android: {
      channelId,
      // pressAction is needed if you want the notification to open the app when pressed
      pressAction: {
        id: 'default',
      },
    },
  });
}

export async function onCreateTriggerNotification({
  date,
  id,
  title,
  body,
}: {
  date: Date;
  id: string;
  title: string;
  body: string;
}) {
  // Create a time-based trigger
  const trigger: TimestampTrigger = {
    type: TriggerType.TIMESTAMP,
    timestamp: date.getTime(),
  };

  // Create a trigger notification
  await notifee.createTriggerNotification(
    {
      id,
      title,
      body,
      android: {
        channelId: 'tandem',
      },
    },
    trigger,
  );
}

export const readBookNotification = () => {
  const numberOfStoryBooks =
    store.getState().activityIndicator.storyBooksReadThisWeek;
  const numberOfPages = store.getState().activityIndicator.pagesReadInBooks;
  const notification1 = NOTIFICATION_PROMPTS[2];
  const notification2 = NOTIFICATION_PROMPTS[3];
  const notification3 = NOTIFICATION_PROMPTS[4];
  const notification4 = NOTIFICATION_PROMPTS[5];
  const notification5 = NOTIFICATION_PROMPTS[8];

  const date = new Date(Date.now() + 1000 * 1 * 60 * 60); // ! 1 hr from now
  console.log({numberOfPages});
  if (numberOfPages === 100) {
    onCreateTriggerNotification({
      body: notification5.body,
      title: 'Tandem',
      id: notification5.id,
      date,
    });
  }

  switch (numberOfStoryBooks) {
    case 1:
      onCreateTriggerNotification({
        body: notification1.body,
        title: 'Tandem',
        id: notification1.id,
        date,
      });
      break;
    case 3:
      onCreateTriggerNotification({
        body: notification2.body,
        title: 'Tandem',
        id: notification2.id,
        date,
      });
      break;
    case 5:
      onCreateTriggerNotification({
        body: notification3.body,
        title: 'Tandem',
        id: notification3.id,
        date,
      });
      break;
    case 10:
      onCreateTriggerNotification({
        body: notification4.body,
        title: 'Tandem',
        id: notification4.id,
        date,
      });
      break;
    default:
      break;
  }
};

export const inactiveTriggerNotifications = () => {
  const notification1 = NOTIFICATION_PROMPTS[6];
  const notification2 = NOTIFICATION_PROMPTS[7];
  onCreateTriggerNotification({
    body: notification1.body,
    title: 'Tandem',
    id: notification1.id,
    date: new Date(Date.now() + 3 * 60 * 60 * 24 * 1000),
  });
  onCreateTriggerNotification({
    body: notification2.body,
    title: 'Tandem',
    id: notification2.id,
    date: new Date(Date.now() + 7 * 60 * 60 * 24 * 1000),
  });
};

export default onDisplayNotification;

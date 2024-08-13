import notifee, {
  AndroidImportance,
  TimestampTrigger,
  TriggerType,
} from '@notifee/react-native';
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
async function onDisplayNotification({
  title,
  body,
  data,
}: {
  title?: string;
  body?: string;
  data?: any;
}) {
  if (!title && !body) {
    console.log('title and body must be provided');
    return;
  }
  // Request permissions (required for iOS)

  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: 'notificationfromfirebase',
    name: 'firebase',
  });

  // Display a notification
  await notifee.displayNotification({
    title: title,
    body: body,
    data: data || {},
    android: {
      channelId,
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
  const channelId = await notifee.createChannel({
    id: 'tandem',
    name: 'Tandem',
    importance: AndroidImportance.HIGH,
  });
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
        channelId,
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

  // const date = readBookNotificationTime(); // ! 1 hr from now
  console.log({numberOfPages});
  if (numberOfPages === 100) {
    onCreateTriggerNotification({
      body: notification5.body,
      title: 'Tandem',
      id: notification5.id,
      date: readBookNotificationTime(),
    });
  }

  switch (numberOfStoryBooks) {
    case 1:
      onCreateTriggerNotification({
        body: notification1.body,
        title: 'Tandem',
        id: notification1.id,
        date: readBookNotificationTime(),
      });
      break;
    case 3:
      onCreateTriggerNotification({
        body: notification2.body,
        title: 'Tandem',
        id: notification2.id,
        date: readBookNotificationTime(),
      });
      break;
    case 5:
      onCreateTriggerNotification({
        body: notification3.body,
        title: 'Tandem',
        id: notification3.id,
        date: readBookNotificationTime(),
      });
      break;
    case 10:
      onCreateTriggerNotification({
        body: notification4.body,
        title: 'Tandem',
        id: notification4.id,
        date: readBookNotificationTime(),
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
export const readBookNotificationTime = () => {
  const UTC_TIME_FRAMES = {
    10: `${new Date().toISOString().split('T')[0]}T09:00:00.000Z`,
    13: `${new Date().toISOString().split('T')[0]}T12:00:00.000Z`,
    18: `${new Date().toISOString().split('T')[0]}T17:00:00.000Z`,
    19: `${new Date().toISOString().split('T')[0]}T18:00:00.000Z`,
  };
  const currentDate = new Date().toISOString();
  if (
    new Date(currentDate).getTime() < new Date(UTC_TIME_FRAMES[10]).getTime()
  ) {
    return new Date(UTC_TIME_FRAMES[10]);
  }
  if (
    new Date(currentDate).getTime() < new Date(UTC_TIME_FRAMES[13]).getTime()
  ) {
    return new Date(UTC_TIME_FRAMES[13]);
  }
  if (
    new Date(currentDate).getTime() < new Date(UTC_TIME_FRAMES[18]).getTime()
  ) {
    return new Date(UTC_TIME_FRAMES[18]);
  }
  if (
    new Date(currentDate).getTime() < new Date(UTC_TIME_FRAMES[19]).getTime()
  ) {
    return new Date(UTC_TIME_FRAMES[19]);
  }
  // if date is greter than 19:00 we do not want to show the notification today... schedule for tomorrow
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return new Date(`${tomorrow.toISOString().split('T')[0]}T09:00:00.000Z`);
};

export default onDisplayNotification;

export interface LoginUserWithEmail {
  email: string;
  password: string;
  deviceId: string;
  fcmToken: string | null;
  deviceType: string;
}

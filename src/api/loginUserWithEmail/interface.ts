export interface LoginUserWithEmail {
  email: string;
  password: string;
  deviceId: string;
  fcmToken?: string;
  deviceType: string;
}

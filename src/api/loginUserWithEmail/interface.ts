export interface LoginUserWithEmail {
  email: string;
  password: string;
  deviceId?: string | undefined;
  fcmToken?: string;
  deviceType?: string | undefined;
}

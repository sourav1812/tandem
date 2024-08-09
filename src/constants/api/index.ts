export enum VERSIONS {
  v1 = '/v1/',
  v2 = '/v2/',
}

export enum API {
  REGISTER_USER = VERSIONS.v1 + 'user/sign-up',
  LOGIN_USER_WITH_EMAIL = VERSIONS.v2 + 'user/sign-in',
  CREATE_CHILD_PROFILE = VERSIONS.v1 + 'children',
  REFRESH_TOKEN = VERSIONS.v1 + 'user/refresh-access-token',
  AUTH = VERSIONS.v1 + 'user/auth',
  GENERATE_STORY = VERSIONS.v1 + 'story-books',
  RATE_STORY = VERSIONS.v1 + 'story-books/rate-book',
  STORIES = VERSIONS.v1 + 'story-books',
  PUBLIC_STORIES = VERSIONS.v1 + 'story-books/public/books',
  LOGOUT = VERSIONS.v1 + 'user/log-out',
  USER_PROFILE = VERSIONS.v1 + 'user/profile',
  CHANGE_PASSWORD = VERSIONS.v1 + 'user/password',
  ADD_BIG_PEOPLE = VERSIONS.v1 + 'big-people',
  AGREEMENT = VERSIONS.v1 + 'user/profile/consent-form',
  SEND_OTP_RESET_PASSWORD = VERSIONS.v1 + 'user/forgot-password/send-email',
  CONFIRM_OTP_RESET_PASSWORD = VERSIONS.v1 + 'user/forgot-password/confirm-otp',
  RESET_PASSWORD = VERSIONS.v1 + 'user/forgot-password/reset-password',
  GET_STORY_ILLUSTRATIONS = VERSIONS.v1 + 'story-books/illustrations',
  MARK_BOOK_AS_READ = VERSIONS.v1 + 'story-books/update-reading-status',
  MARK_BOOK_AS_ARCHIVED = VERSIONS.v1 + 'story-books/archive-status',
  MARK_BOOK_AS_PUBLIC = VERSIONS.v1 + 'story-books/public-status',
  GET_STORY_THUMBNAILS = VERSIONS.v1 + 'story-books/{BOOK_ID_HERE}/thumbnail',
  POST_CHILD_ANALYTICS = VERSIONS.v1 + 'analytics/children',
  GET_CHILD_ANALYTICS = VERSIONS.v1 + 'analytics/children',
  CONTACT_US = VERSIONS.v1 + 'user/contact-us',
  ARCHIVED_STORIES = VERSIONS.v1 + 'story-books/archive',
  REPORT_IMAGE = VERSIONS.v1 + 'story-books/{BOOK_ID_HERE}/report-image',
  PUSH_VOICE_DATA = VERSIONS.v1 + 'story-books/{BOOK_ID_HERE}/reading-session',
  ANALYTICS_SELF = VERSIONS.v1 + 'analytics/users/self',
  SEND_OTP_VERIFY_EMAIL = VERSIONS.v1 + 'user/email-verification/send-otp',
  VERIFY_EMAIL = VERSIONS.v1 + 'user/email-verification/verify-otp',
  CONSENT_NEWSLETTER = VERSIONS.v1 + 'user/promotional-email-consent',
}

export enum ENVIRONMENT {
  LOCAL = 'LOCAL',
  DEVELOPMENT = 'DEVELOPMENT',
  PRODUCTION = 'PRODUCTION',
  TESTING = 'TESTING',
}

const ENV_VARS = {
  [ENVIRONMENT.LOCAL]: {
    API_URL: 'https://ffad-38-183-79-217.ngrok-free.app', // * LOCAL URL
  },
  [ENVIRONMENT.TESTING]: {
    API_URL: 'https://tandem-app-backend-beta.azurewebsites.net', // * TESTING URL
  },
  [ENVIRONMENT.DEVELOPMENT]: {
    API_URL: 'https://tandem-app-backend-beta.azurewebsites.net', // * DEV URL
  },
  [ENVIRONMENT.PRODUCTION]: {
    API_URL: 'https://tandem-app-backend-prod.azurewebsites.net', // * PROD URL
  },
};

// ! Select ENV from here
export const SELECTED_ENVIRONMENT = ENVIRONMENT.TESTING;
// ! URLs
export const BASE_URL = ENV_VARS[SELECTED_ENVIRONMENT].API_URL;

export const PEXELS_API_KEY =
  'EX5cnNzfNvWCwgBYmgPwZzLAR7KX1CMnj1bDHJEHljQk2bEA2lh8oPc5';

export const STATUS_CODE = '~## Status ~~~~-> ';

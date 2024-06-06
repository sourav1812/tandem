export enum API {
  REGISTER_USER = 'user/sign-up', //? POST
  LOGIN_USER_WITH_EMAIL = 'user/sign-in', //? POST
  CREATE_CHILD_PROFILE = 'children', //? POST
  REFRESH_TOKEN = 'user/refresh-access-token', //? POST
  AUTH = 'user/auth', //? POST
  GENERATE_STORY = 'story-books', //? POST
  RATE_STORY = 'story-books/rate-book', //? POST
  STORIES = 'story-books', //* GET
  PUBLIC_STORIES = 'story-books/public/books', //* GET
  LOGOUT = 'user/log-out', //? POST
  USER_PROFILE = 'user/profile', //* GET
  CHANGE_PASSWORD = 'user/password', //? PUT
  ADD_BIG_PEOPLE = 'big-people', //?POST
  AGREEMENT = 'user/profile/consent-form', //?POST
  SEND_OTP_RESET_PASSWORD = 'user/forgot-password/send-email', //?POST
  CONFIRM_OTP_RESET_PASSWORD = 'user/forgot-password/confirm-otp', //?POST
  RESET_PASSWORD = 'user/forgot-password/reset-password', //?POST
  GET_STORY_ILLUSTRATIONS = 'story-books/illustrations', // * GET
  MARK_BOOK_AS_READ = 'story-books/update-reading-status', // ? POST
  MARK_BOOK_AS_ARCHIVED = 'story-books/archive-status', // ? POST
  MARK_BOOK_AS_PUBLIC = 'story-books/public-status', // ? POST
  GET_STORY_THUMBNAILS = 'story-books/{BOOK_ID_HERE}/thumbnail',
  POST_CHILD_ANALYTICS = 'analytics/children',
  GET_CHILD_ANALYTICS = 'analytics/children',
  CONTACT_US = 'user/contact-us',
  ARCHIVED_STORIES = 'story-books/archive',
  REPORT_IMAGE = 'story-books/{BOOK_ID_HERE}/report-image',
  PUSH_VOICE_DATA = 'story-books/{BOOK_ID_HERE}/reading-session',
  ANALYTICS_SELF = 'analytics/users/self',
}

export enum ENVIRONMENT {
  LOCAL = 'LOCAL',
  DEVELOPMENT = 'DEVELOPMENT',
  PRODUCTION = 'PRODUCTION',
  TESTING = 'TESTING',
}

const ENV_VARS = {
  [ENVIRONMENT.LOCAL]: {
    API_URL:
      'https://33ab-2401-4900-1c71-4922-782d-1356-668e-c3d.ngrok-free.app/v1/', // * LOCAL URL
  },
  [ENVIRONMENT.TESTING]: {
    API_URL: 'https://tandem-app-backend-beta.azurewebsites.net/v1/', // * TESTING URL
  },
  [ENVIRONMENT.DEVELOPMENT]: {
    API_URL: 'https://tandem-app-backend-beta.azurewebsites.net/v1/', // * DEV URL
  },
  [ENVIRONMENT.PRODUCTION]: {
    API_URL: 'https://tandem-app-backend-prod.azurewebsites.net/v1/', // * PROD URL
  },
};

// ! Select ENV from here
export const SELECTED_ENVIRONMENT = ENVIRONMENT.LOCAL;
// ! URLs
export const BASE_URL = ENV_VARS[SELECTED_ENVIRONMENT].API_URL;

export const PEXELS_API_KEY =
  'EX5cnNzfNvWCwgBYmgPwZzLAR7KX1CMnj1bDHJEHljQk2bEA2lh8oPc5';

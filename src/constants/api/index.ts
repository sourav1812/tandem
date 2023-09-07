export enum API {
  REGISTER_USER = 'user/sign-up', //? POST
  LOGIN_USER_WITH_EMAIL = 'user/sign-in', //? POST
  CREATE_CHILD_PROFILE = 'children', //? POST
  REFRESH_TOKEN = 'user/refresh-access-token', //? POST
  AUTH = 'user/auth', //? POST
  GENERATE_STORY = 'story-books', //? POST
  RATE_STORY = 'story-books/rate-book', //? POST
  STORIES = 'story-books', //? GET
  LOGOUT = 'user/log-out', //? POST
  USER_PROFILE = 'user/profile', //? GET
  CHANGE_PASSWORD = 'user/password', //? PUT
  ADD_BIG_PEOPLE = 'big-people', //?POST
}

export enum ENVIRONMENT {
  DEVELOPMENT = 'DEVELOPMENT',
  PRODUCTION = 'PRODUCTION',
}

const ENV_VARS = {
  [ENVIRONMENT.DEVELOPMENT]: {
    API_URL: 'http://192.168.1.61:5000/v1/', // * STAGING URL
  },
  [ENVIRONMENT.PRODUCTION]: {
    API_URL: 'https://tandem.geeky.dev/v1/', // * LIVE URL
  },
};

// ! Select ENV from here
export const SELECTED_ENVIRONMENT = ENVIRONMENT.PRODUCTION;
// ! URLs
export const BASE_URL = ENV_VARS[SELECTED_ENVIRONMENT].API_URL;

export const PEXELS_API_KEY =
  'EX5cnNzfNvWCwgBYmgPwZzLAR7KX1CMnj1bDHJEHljQk2bEA2lh8oPc5';

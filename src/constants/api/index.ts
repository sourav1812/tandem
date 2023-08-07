export enum API {
  REGISTER_USER = 'user/sign_up', //? POST
  LOGIN_USER_WITH_EMAIL = 'user/sign_in', //? POST
}

export enum ENVIRONMENT {
  DEVELOPMENT = 'DEVELOPMENT',
  PRODUCTION = 'PRODUCTION',
}

const ENV_VARS = {
  [ENVIRONMENT.DEVELOPMENT]: {
    API_URL: 'http://192.168.1.59:5000/v1/', // * STAGING URL
  },
  [ENVIRONMENT.PRODUCTION]: {
    API_URL: '', // * LIVE URL
  },
};

// ! Select ENV from here
export const SELECTED_ENVIRONMENT = ENVIRONMENT.DEVELOPMENT;
// ! URLs
export const BASE_URL = ENV_VARS[SELECTED_ENVIRONMENT].API_URL;

export const PEXELS_API_KEY =
  'EX5cnNzfNvWCwgBYmgPwZzLAR7KX1CMnj1bDHJEHljQk2bEA2lh8oPc5';

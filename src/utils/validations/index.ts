import {translation} from '../methods';

export interface ValidationError {
  message?: string;
  type?: string;
  value: string;
}

export enum FORM_INPUT_TYPE {
  EMAIL = 'EMAIL',
  PASSWORD = 'PASSWORD',
  NAME = 'NAME',
  PHONE = 'PHONE',
  PIN = 'PIN',
  YEARS = 'YEARS',
  REGISTERATION_NUMBER = 'REGISTERATION_NUMBER',
}

const validateEmail = (value: string): ValidationError => {
  if (!value) {
    return {
      message: translation('validations.email-required'),
      type: FORM_INPUT_TYPE.EMAIL,
      value,
    };
  }
  if (/\s/.test(value)) {
    return {
      message: translation('validations.email-no-spaces'),
      type: FORM_INPUT_TYPE.EMAIL,
      value,
    };
  }
  if (!/^\S+@\S+\.\S+$/.test(value)) {
    return {
      message: translation('validations.email-invalid'),
      type: FORM_INPUT_TYPE.EMAIL,
      value,
    };
  }

  return {value};
};

const validatePassword = (value: string): ValidationError => {
  if (!value) {
    return {
      message: translation('validations.password-required'),
      type: FORM_INPUT_TYPE.PASSWORD,
      value,
    };
  }
  if (/\s/.test(value)) {
    return {
      message: translation('validations.password-no-spaces'),
      type: FORM_INPUT_TYPE.PASSWORD,
      value,
    };
  }
  if (!/^\S{6,}$/.test(value)) {
    return {
      message: translation('validations.password-length'),
      type: FORM_INPUT_TYPE.PASSWORD,
      value,
    };
  }

  return {value};
};

const validateName = (value: string): ValidationError => {
  if (!value) {
    return {
      message: translation('validations.name-required'),
      type: FORM_INPUT_TYPE.NAME,
      value,
    };
  }

  return {value};
};
const validateYears = (value: string): ValidationError => {
  if (!value) {
    return {
      message: translation('validations.name-required'),
      type: FORM_INPUT_TYPE.NAME,
      value,
    };
  }
  if (parseInt(value, 10) <= 1) {
    return {
      message: translation('validations.year-validation'),
      type: FORM_INPUT_TYPE.YEARS,
      value,
    };
  }

  return {value};
};

const validatePhone = (value: string): ValidationError => {
  if (!value) {
    return {
      message: translation('validations.phone-required'),
      type: FORM_INPUT_TYPE.PHONE,
      value,
    };
  }
  if (/\s/.test(value)) {
    return {
      message: translation('validations.phone-no-spaces'),
      type: FORM_INPUT_TYPE.PHONE,
      value,
    };
  }
  if (!/^[1-9][0-9]{5,14}$/.test(value)) {
    return {
      message: translation('validations.phone-invalid'),
      type: FORM_INPUT_TYPE.PHONE,
      value: value.replace(/^0/, ''),
    };
  }

  return {value};
};
const validatePin = (value: string): ValidationError => {
  if (!value) {
    return {
      message: translation('validations.pin-required'),
      type: FORM_INPUT_TYPE.PIN,
      value,
    };
  }
  if (/\s/.test(value)) {
    return {
      message: translation('validations.pin-no-spaces'),
      type: FORM_INPUT_TYPE.PIN,
      value,
    };
  }
  if (/\D/.test(value)) {
    return {
      message: translation('validations.pin-invalid'),
      type: FORM_INPUT_TYPE.PIN,
      value,
    };
  }

  return {value};
};
const validateRegistrationNumber = (value: string): ValidationError => {
  if (!value) {
    return {
      message: translation('validations.rn-required'),
      type: FORM_INPUT_TYPE.REGISTERATION_NUMBER,
      value,
    };
  }
  if (/\s/.test(value)) {
    return {
      message: translation('validations.rn-no-spaces'),
      type: FORM_INPUT_TYPE.REGISTERATION_NUMBER,
      value,
    };
  }
  if (!/^(\d{2}\.){2}\d{2}-\d{3}\.\d{2}$/.test(value)) {
    return {
      message: translation('validations.rn-format'),
      type: FORM_INPUT_TYPE.REGISTERATION_NUMBER,
      value,
    };
  }

  return {value};
};
const validateForm = (type: string, value: string): ValidationError => {
  switch (type) {
    case FORM_INPUT_TYPE.EMAIL:
      return validateEmail(value);
    case FORM_INPUT_TYPE.PASSWORD:
      return validatePassword(value);
    case FORM_INPUT_TYPE.NAME:
      return validateName(value);
    case FORM_INPUT_TYPE.PHONE:
      return validatePhone(value);
    case FORM_INPUT_TYPE.PIN:
      return validatePin(value);
    case FORM_INPUT_TYPE.YEARS:
      return validateYears(value);
    case FORM_INPUT_TYPE.REGISTERATION_NUMBER:
      return validateRegistrationNumber(value);
    default:
      return {value};
  }
};

export default validateForm;

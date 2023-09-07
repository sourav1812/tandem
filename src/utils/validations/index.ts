import {translation} from '../methods';

export interface ValidationError {
  message?: string;
  type?: string;
  value: string;
}

export enum FORM_INPUT_TYPE {
  EMAIL = 'EMAIL',
  PASSWORD = 'PASSWORD',
  CONFIRM_PASSWORD = 'CONFIRM_PASSWORD',
  NAME = 'NAME',
  PHONE = 'PHONE',
  PIN = 'PIN',
  DOB = 'DOB',
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

  if (value.length < 8 && value.length > 20) {
    return {
      message: translation('validations.password-length'),
      type: FORM_INPUT_TYPE.PASSWORD,
      value,
    };
  }

  if (!/[A-Z]/.test(value)) {
    return {
      message: translation('validations.atleast-one-capital-letter'),
      type: FORM_INPUT_TYPE.PASSWORD,
      value,
    };
  }

  if (!/[a-z]/.test(value)) {
    return {
      message: translation('validations.atleast-one-small-letter'),
      type: FORM_INPUT_TYPE.PASSWORD,
      value,
    };
  }

  if (!/\d/.test(value)) {
    return {
      message: translation('validations.atleast-one-digit'),
      type: FORM_INPUT_TYPE.PASSWORD,
      value,
    };
  }

  if (!/\W/.test(value)) {
    return {
      message: translation('validations.atleast-one-symbol'),
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

  return {value};
};

const validateConfirmPassword = (value: string): ValidationError => {
  if (!value) {
    return {
      message: translation('validations.password-required'),
      type: FORM_INPUT_TYPE.CONFIRM_PASSWORD,
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

const validateDateOfBirth = (value: string): ValidationError => {
  if (!value) {
    return {
      message: translation('validations.dob-required'),
      type: FORM_INPUT_TYPE.DOB,
      value,
    };
  } else {
    return {value};
  }
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
    case FORM_INPUT_TYPE.CONFIRM_PASSWORD:
      return validateConfirmPassword(value);
    case FORM_INPUT_TYPE.DOB:
      return validateDateOfBirth(value);
    default:
      return {value};
  }
};

export default validateForm;

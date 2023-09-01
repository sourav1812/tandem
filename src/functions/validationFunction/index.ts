import validateForm, {ValidationError} from '@tandem/utils/validations';

interface ValueObject {
  state: ValidationError;
  setState: React.Dispatch<React.SetStateAction<ValidationError>>;
  typeOfValidation: string;
}

const validationFunction = (valueObject: ValueObject[]) => {
  const array: any = [];
  valueObject.map(value => {
    if (value.state.value === '' || value.state.message) {
      value.setState(validateForm(value.typeOfValidation, value.state.value));
      array.push(false);
    } else {
      array.push(true);
    }
  });
  if (array.includes(false)) {
    return false;
  } else {
    return true;
  }
};

export default validationFunction;

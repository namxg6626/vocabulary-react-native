import {object, string} from 'yup';

const requiredString = string().required('Required!');

export const addNewWordValidationSchema = object().shape({
  word: requiredString,
  meaning: requiredString,
});

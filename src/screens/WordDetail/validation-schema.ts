import {object, string} from 'yup';

const requiredString = string().required('Required!');

export const validationSchema = object().shape({
  word: requiredString,
  meaning: requiredString,
});

import * as yup from 'yup';
import { parse, isValid as dateFnsIsValid, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const dateFormat = /^\d{2}\/\d{2}\/\d{4}$/;

const dayWeek = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export const transformDateStringToDate = (
  originalValue: any,
  originalObject: any,
) => {
  const parsedDate = parse(originalValue, 'dd/MM/yyyy', new Date());

  if (!dateFnsIsValid(parsedDate)) {
    throw new yup.ValidationError(
      'Invalid date format',
      originalObject.path,
      'date.invalid',
    );
  }

  return parsedDate;
};

export const transformDateToFormattedString = (originalValue: any) => {
  if (dateFnsIsValid(originalValue)) {
    return format(originalValue, 'dd/MM/yyyy', { locale: ptBR });
  }

  return originalValue;
};

const dateSchema = yup
  .mixed()
  .test('isValidDate', 'Invalid date format', function (value) {
    if (!value) {
      return true;
    }

    if (typeof value === 'string' && !dateFormat.test(value)) {
      return this.createError({
        path: this.path!,
        message: 'Invalid date format',
      });
    }

    if (typeof value === 'string') {
      this.parent[this.path!] = transformDateStringToDate(value, this);
    }

    return true;
  })
  .transform(transformDateToFormattedString);

export const createValidationSchema = yup.object({
  firstName: yup.string().min(5).required('Name is required'),
  lastName: yup.string().min(5).required('Name is required'),
  birthDate: dateSchema.required('Birthday is required'),
  city: yup.string().required('City is required'),
  country: yup.string().required('Country is required'),
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

export const eventsValidationSchema = yup.object({
  description: yup.string().required('Description is required'),
  dayOfWeek: yup
    .string()
    .required('DayOfWeek is required')
    .test('is-valid-day', 'Invalid day of week', function (value) {
      if (!value) {
        return true;
      }

      if (!dayWeek.includes(value)) {
        return this.createError({
          path: this.path!,
          message: 'Invalid day of week',
        });
      }

      return true;
    }),
});

import { AxiosResponse } from 'axios';
import { camelCase, isArray, transform, isObject } from 'lodash';
export const snakeToCamel = (input: AxiosResponse<string, unknown>) =>
  transform(
    input,
    (result: Record<string, unknown>, value: unknown, key: string, target) => {
      const camelKey = isArray(target) ? key : camelCase(key);
      result[camelKey] = isObject(value)
        ? snakeToCamel(value as AxiosResponse<string, unknown>)
        : value;
    }
  );

// convert keys of object to snake_case from camelCase
export const camelToSnake = (obj) => {
  const newObj = {};
  for (const key in obj) {
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(key)) {
      const newKey = key.replace(
        /[A-Z]/g,
        (match) => `_${match.toLowerCase()}`
      );
      newObj[newKey] = obj[key];
    }
  }
  return newObj;
};

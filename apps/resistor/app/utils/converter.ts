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

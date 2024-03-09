import BigNumber from 'bignumber.js';
import { AnyObject, ISchema, StringSchema } from 'yup';

const isAbsent = (value: any): boolean => value == null;

export interface StringSchemaWithNumeric {
  numeric(message?: string): StringSchema;
  gt(num: number, message?: string): StringSchema;
  gte(num: number, message?: string): StringSchema;
  lt(num: number, message?: string): StringSchema;
  lte(num: number, message?: string): StringSchema;
  eq(num: number, message?: string): StringSchema;
}

declare module "yup" {
  interface StringSchema extends StringSchemaWithNumeric {
  }
}

export const isNumeric = function(this: StringSchema, message?: any): StringSchema<string | undefined, AnyObject, undefined, ""> {
  const defaultMessage = `\${path} must a valid number`;
  return this.test('numeric', message ?? defaultMessage, function(value) {
    if (isAbsent(value)) return true;
    const result = new BigNumber(value!);
    return !result.isNaN();
  });
}

export const isGreaterThan = function(this: StringSchema, num: any, message?: any): StringSchema<string | undefined, AnyObject, undefined, ""> {
  const defaultMessage = `\${path} must be greater than ${num}`;
  return this.test('gt', message ?? defaultMessage, function(value) {
    if (isAbsent(value)) return true;
    const isValid = new BigNumber(value!).gt(num);
    return isValid;
  });
}

export const isGreaterThanOrEqual = function(this: StringSchema, num: any, message?: any): StringSchema<string | undefined, AnyObject, undefined, ""> {
  const defaultMessage = `\${path} must be greater than or equal to ${num}`;
  return this.test('lte', message ?? defaultMessage, function(value) {
    if (isAbsent(value)) return true;
    const isValid = new BigNumber(value!).gte(num);
    return isValid;
  });
}


export const isLessThan = function(this: StringSchema, num: any, message?: any): StringSchema<string | undefined, AnyObject, undefined, ""> {
  const defaultMessage = `\${path} must be less than ${num}`;
  return this.test('lt', message ?? defaultMessage, function(value) {
    if (isAbsent(value)) return true;
    const isValid = new BigNumber(value!).lt(num);
    return isValid;
  });
}


export const isLessThanOrEqual = function(this: StringSchema, num: any, message?: any): StringSchema<string | undefined, AnyObject, undefined, ""> {
  const defaultMessage = `\${path} must be less than or equal to ${num}`;
  return this.test('lte', message ?? defaultMessage, function(value) {
    if (isAbsent(value)) return true;
    const isValid = new BigNumber(value!).lte(num);
    return isValid;
  });
}

export const isEqual = function(this: StringSchema, num: any, message?: any): StringSchema<string | undefined, AnyObject, undefined, ""> {
  const defaultMessage = `\${path} must be equal to ${num}`;
  return this.test('eq', message ?? defaultMessage, function(value) {
    if (isAbsent(value)) return true;
    const isValid = new BigNumber(value!).eq(num);
    return isValid;
  });
}

type AddMethod = <T extends ISchema<any>>(schemaType: (...arg: any[]) => T, name: string, fn: (this: T, ...args: any[]) => T) => void

export const register = function(addMethod: AddMethod, stringSchema: () => StringSchema): void {
  addMethod(stringSchema, 'numeric', isNumeric);
  addMethod(stringSchema, 'gt', isGreaterThan);
  addMethod(stringSchema, 'gte', isGreaterThanOrEqual);
  addMethod(stringSchema, 'lt', isLessThan);
  addMethod(stringSchema, 'lte', isLessThanOrEqual);
  addMethod(stringSchema, 'eq', isEqual);
}

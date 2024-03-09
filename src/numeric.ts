import BigNumber from 'bignumber.js';
import { AnyObject, ISchema, StringSchema } from 'yup';

const isAbsent = (value: any): boolean => value == null;

declare module "yup" {
  interface StringSchema {
      numeric(message?: string): StringSchema;
      gt(num: number, message?: string): StringSchema;
      gte(num: number, message?: string): StringSchema;
      lt(num: number, message?: string): StringSchema;
      lte(num: number, message?: string): StringSchema;
      eq(num: number, message?: string): StringSchema;
  }
}

export const isNumeric = function(this: StringSchema, message?: any): StringSchema<string | undefined, AnyObject, undefined, ""> {
  return this.test('numeric', message, function(value) {
    if (isAbsent(value)) return true;
    const result = new BigNumber(value!);
    return !result.isNaN();
  });
}

export const isGreaterThan = function(this: StringSchema, num: any, message?: any): StringSchema<string | undefined, AnyObject, undefined, ""> {
  return this.test('gt', message, function(value) {
    if (isAbsent(value)) return true;
    const isValid = new BigNumber(value!).gt(num);
    return isValid;
  });
}


export const isLessThan = function(this: StringSchema, num: any, message?: any): StringSchema<string | undefined, AnyObject, undefined, ""> {
  return this.test('lt', message, function(value) {
    if (isAbsent(value)) return true;
    const isValid = new BigNumber(value!).lt(num);
    return isValid;
  });
}


export const isLessThanOrEqual = function(this: StringSchema, num: any, message?: any): StringSchema<string | undefined, AnyObject, undefined, ""> {
  return this.test('lte', message, function(value) {
    if (isAbsent(value)) return true;
    const isValid = new BigNumber(value!).lte(num);
    return isValid;
  });
}

export const isEqual = function(this: StringSchema, num: any, message?: any): StringSchema<string | undefined, AnyObject, undefined, ""> {
  return this.test('eq', message, function(value) {
    if (isAbsent(value)) return true;
    const isValid = new BigNumber(value!).eq(num);
    return isValid;
  });
}

type AddMethod = <T extends ISchema<any>>(schemaType: (...arg: any[]) => T, name: string, fn: (this: T, ...args: any[]) => T) => void

export const addNumericMethods = function(addMethod: AddMethod, string: () => StringSchema ): void {
  addMethod(string, 'numeric', isNumeric)
  addMethod(string, 'gt', isGreaterThan)
  addMethod(string, 'lt', isLessThan)
  addMethod(string, 'lte', isLessThanOrEqual)
  addMethod(string, 'eq', isEqual)
}

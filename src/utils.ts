import BigNumber from 'bignumber.js';
import { INumericSchema } from './numeric';
import { Reference } from 'yup';

export const isAbsent = (value: any): boolean => value == null;

export function isGreaterThanOrEqual(this: INumericSchema, num: number|string, message?: string): INumericSchema {
  const defaultMessage = `\${path} must be greater than or equal to ${num}`;
  return this.test('gte', message ?? defaultMessage, function(value: string) {
    if (isAbsent(value)) return true;
    const isValid = new BigNumber(value!).gte(num);
    return isValid;
  });
}

export function isLessThanOrEqual(this: INumericSchema, num: number|string, message?: string) {
  const defaultMessage = `\${path} must be less than or equal to ${num}`;
  return this.test('lte', message ?? defaultMessage, function(value: string) {
    if (isAbsent(value)) return true;
    const isValid = new BigNumber(value!).lte(num);
    return isValid;
  });
}


export function isEqual(this: INumericSchema, num: number|string, message?: string) {
  const defaultMessage = `\${path} must be equal to ${num}`;
  return this.test('eq', message ?? defaultMessage, function(value: string) {
    if (isAbsent(value)) return true;
    const isValid = new BigNumber(value!).eq(num);
    return isValid;
  });
}


export function isGreaterThan(this: INumericSchema, num: number|string, message?: string) {
  const defaultMessage = `\${path} must be greater than ${num}`;
  return this.test('gt', message ?? defaultMessage, function(value: string) {
    if (isAbsent(value)) return true;
    const isValid = new BigNumber(value!).gt(num);
    return isValid;
  });
}


export function isLessThan(this: INumericSchema, num: number|string, message?: string) {
  const defaultMessage = `\${path} must be less than ${num}`;
  return this.test('lt', message ?? defaultMessage, function(value: string) {
    if (isAbsent(value)) return true;
    const isValid = new BigNumber(value!).lt(num);
    return isValid;
  });
}

export const isNumeric = function(this: INumericSchema, message?: string) {
  const defaultMessage = `\${path} must a valid number`;
  return this.test('numeric', message ?? defaultMessage, function(value: string) {
    if (isAbsent(value)) return true;
    const result = new BigNumber(value!);
    return !result.isNaN();
  });
}

export const isInteger = function(this: INumericSchema, message?: string) {
  const defaultMessage = `\${path} must be an integer`;
  return this.test('integer', message ?? defaultMessage, function(value: string) {
    if (isAbsent(value)) return true;
    const isValid = new BigNumber(value!).isInteger();
    return isValid;
  });
}

export const isMoreThan = function(this: INumericSchema, more: number|string|Reference<number|string>, message?: string) {
  const isPrimitive = ['string', 'number'].includes(typeof more)
  const morePath = !isPrimitive
   ? (more as Reference<number|string>).path
   : more;

  const defaultMessage = `\${path} must be more than ${morePath}`;
  return this.test('moreThan', message ?? defaultMessage, function(value: string) {
    if (isAbsent(value)) return true;

    if (isPrimitive) {
      return new BigNumber(value!).isGreaterThan(more as string|number);
    }

    const parsedMore = this.resolve(more);
    const parsed = new BigNumber(parsedMore);
    if (parsed.isNaN()) return false;
    
    const isValid = new BigNumber(value!).isGreaterThan(parsed);
    return isValid;
  });
}

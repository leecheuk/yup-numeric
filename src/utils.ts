import BigNumber from 'bignumber.js';
import { INumericSchema } from './numeric';
import { Message, Reference } from 'yup';

export const isAbsent = (value: any): boolean => value == null;

const isPrimitive = (value: number|string|Reference<number|string>): boolean => 
  ['string', 'number'].includes(typeof value);

const getPath = (value: number|string|Reference<number|string>): string => !isPrimitive(value)
  ? (value as Reference<number|string>).path
  : value;

export function isGreaterThanOrEqual(this: INumericSchema, num: number|string|Reference<number|string>, message?: Message<any>): INumericSchema {
  const primitive = isPrimitive(num);
  const path = getPath(num);

  const defaultMessage = `\${path} must be greater than or equal to ${path}`;
  return this.test('gte', message ?? defaultMessage, function(value: string) {
    if (isAbsent(value)) return true;

    if (primitive) {
      return new BigNumber(value!).gte(num as string|number);
    }

    const resolved = this.resolve(num) as string;
    const parsed = new BigNumber(resolved);
    if (parsed.isNaN()) return false;

    const isValid = new BigNumber(value!).gte(parsed);
    return isValid;
  });
}

export function isLessThanOrEqual(this: INumericSchema, num: number|string|Reference<number|string>, message?: Message<any>) {
  const primitive = isPrimitive(num);
  const path = getPath(num);

  const defaultMessage = `\${path} must be less than or equal to ${path}`;
  return this.test('lte', message ?? defaultMessage, function(value: string) {
    if (isAbsent(value)) return true;

    if (primitive) {
      return new BigNumber(value!).lte(num as string|number);
    }

    const resolved = this.resolve(num);
    const parsed = new BigNumber(resolved);
    if (parsed.isNaN()) return false;
    
    const isValid = new BigNumber(value!).lte(parsed);
    return isValid;
  });
}


export function isEqual(this: INumericSchema, num: number|string|Reference<number|string>, message?: Message<any>) {
  const primitive = isPrimitive(num);
  const path = getPath(num);

  const defaultMessage = `\${path} must be equal to ${path}`;
  return this.test('eq', message ?? defaultMessage, function(value: string) {
    if (isAbsent(value)) return true;

    if (primitive) {
      return new BigNumber(value!).eq(num as string|number);
    }

    const resolved = this.resolve(num);
    const parsed = new BigNumber(resolved);
    if (parsed.isNaN()) return false;

    const isValid = new BigNumber(value!).eq(parsed);
    return isValid;
  });
}


export function isGreaterThan(this: INumericSchema, num: number|string, message?: Message<any>) {
  const defaultMessage = `\${path} must be greater than ${num}`;
  return this.test('gt', message ?? defaultMessage, function(value: string) {
    if (isAbsent(value)) return true;
    const isValid = new BigNumber(value!).gt(num);
    return isValid;
  });
}


export function isLessThan(this: INumericSchema, num: number|string, message?: Message<any>) {
  const defaultMessage = `\${path} must be less than ${num}`;
  return this.test('lt', message ?? defaultMessage, function(value: string) {
    if (isAbsent(value)) return true;
    const isValid = new BigNumber(value!).lt(num);
    return isValid;
  });
}

export const isNumeric = function(this: INumericSchema, message?: Message<any>) {
  const defaultMessage = `\${path} must a valid number`;
  return this.test('numeric', message ?? defaultMessage, function(value: string) {
    if (isAbsent(value)) return true;
    const result = new BigNumber(value!);
    return !result.isNaN();
  });
}

export const isInteger = function(this: INumericSchema, message?: Message<any>) {
  const defaultMessage = `\${path} must be an integer`;
  return this.test('integer', message ?? defaultMessage, function(value: string) {
    if (isAbsent(value)) return true;
    const isValid = new BigNumber(value!).isInteger();
    return isValid;
  });
}

export const isMoreThanWithRef = function(this: INumericSchema, more: number|string|Reference<number|string>, message?: Message<any>) {
  const primitive = isPrimitive(more);
  const morePath = getPath(more);

  const defaultMessage = `\${path} must be more than ${morePath}`;
  return this.test('moreThan', message ?? defaultMessage, function(value: string) {
    if (isAbsent(value)) return true;

    if (primitive) {
      return new BigNumber(value!).isGreaterThan(more as string|number);
    }

    const resolved = this.resolve(more);
    const parsed = new BigNumber(resolved);
    if (parsed.isNaN()) return false;
    
    const isValid = new BigNumber(value!).isGreaterThan(parsed);
    return isValid;
  });
}

export const isLessThanWithRef = function(this: INumericSchema, less: number|string|Reference<number|string>, message?: Message<any>) {
  const primitive = isPrimitive(less);
  const lessPath = getPath(less);

  const defaultMessage = `\${path} must be less than ${lessPath}`;
  return this.test('moreThan', message ?? defaultMessage, function(value: string) {
    if (isAbsent(value)) return true;

    if (primitive) {
      return new BigNumber(value!).isLessThan(less as string|number);
    }

    const resolved = this.resolve(less);
    const parsed = new BigNumber(resolved);
    if (parsed.isNaN()) return false;
    
    const isValid = new BigNumber(value!).isLessThan(parsed);
    return isValid;
  });
}

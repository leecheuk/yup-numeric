import { Message, MixedSchema, Reference } from "yup";
import { isAbsent, isEqual, isGreaterThan, isGreaterThanOrEqual, isInteger, isLessThan, isLessThanOrEqual, isLessThanWithRef, isMoreThanWithRef } from "./utils";
import BigNumber from "bignumber.js";

export interface INumericSchema extends MixedSchema<string> {
  gte: (num: number|string|Reference<number|string>, message?: string) => INumericSchema;
  lte: (num: number|string|Reference<number|string>, message?: string) => INumericSchema;
  eq: (num: number|string|Reference<number|string>, message?: string) => INumericSchema;
  gt: (num: number|string, message?: string) => INumericSchema;
  lt: (num: number|string, message?: string) => INumericSchema;
  min: (num: number|string|Reference<number|string>, message?: string) => INumericSchema;
  max: (num: number|string|Reference<number|string>, message?: string) => INumericSchema;
  integer: (message?: string) => INumericSchema;
  moreThan: (more: number|string|Reference<number|string>, message?: string) => INumericSchema;
  lessThan: (more: number|string|Reference<number|string>, message?: string) => INumericSchema;
  required: (message?: string) => INumericSchema;
  optional: () => INumericSchema;
  nullable: (message?: string) => INumericSchema;
  nonNullable: () => INumericSchema;
}

export class NumericSchema extends MixedSchema<string> {
  constructor() {
    super({
      type: 'numeric',
      check(value: string): value is NonNullable<string> {
        const parsed = new BigNumber(value);
        return typeof value === 'string' && !parsed.isNaN();
      },
    });

    this.withMutation((schema) => {
      schema.transform(function mutate(value) {
        if (isAbsent(value)) return value;
        return value.toString();
      })
    });
  }

  gte(num: number|string|Reference<number|string>, message?: string): INumericSchema {
    return isGreaterThanOrEqual.call(this, num, message);
  }

  lte(num: number|string|Reference<number|string>, message?: string): INumericSchema {
    return isLessThanOrEqual.call(this, num, message);
  }

  min(num: number|string|Reference<number|string>, message?: string): INumericSchema {
    return isGreaterThanOrEqual.call(this, num, message);
  }

  max(num: number|string|Reference<number|string>, message?: string): INumericSchema {
    return isLessThanOrEqual.call(this, num, message);
  }

  eq(num: number|string|Reference<number|string>, message?: string): INumericSchema {
    return isEqual.call(this, num, message);
  }

  gt(num: number|string, message?: string): INumericSchema {
    return isGreaterThan.call(this, num, message);
  }

  lt(num: number|string, message?: string): INumericSchema {
    return isLessThan.call(this, num, message);
  }

  integer(message?: string): INumericSchema {
    return isInteger.call(this, message);
  }

  moreThan(more: number|string|Reference<number|string>, message?: string): INumericSchema {
    return isMoreThanWithRef.call(this, more, message);
  }

  lessThan(less: number|string|Reference<number|string>, message?: string): INumericSchema {
    return isLessThanWithRef.call(this, less, message);
  }

  required(msg?: Message<any> | undefined): INumericSchema {
    return this.required(msg);
  }

  notRequired(msg?: Message<any> | undefined): INumericSchema {
    return this.required(msg);
  }

  optional(): INumericSchema {
    return this.optional();
  }

  nonNullable(): INumericSchema {
    return this.nonNullable();
  }

  nullable(msg?: Message<any> | undefined): INumericSchema {
    return this.nullable(msg);
  }
}

export const numeric = () => new NumericSchema();

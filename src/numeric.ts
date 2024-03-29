import { Message, MixedSchema, Reference } from "yup";
import { isAbsent, isEqual, isGreaterThan, isGreaterThanOrEqual, isInteger, isLessThan, isLessThanOrEqual, isLessThanWithRef, isMoreThanWithRef } from "./utils";
import BigNumber from "bignumber.js";

export interface INumericSchema extends MixedSchema<string> {
  gte: (num: number|string|Reference<number|string>, message?: Message<any>) => INumericSchema;
  lte: (num: number|string|Reference<number|string>, message?: Message<any>) => INumericSchema;
  eq: (num: number|string|Reference<number|string>, message?: Message<any>) => INumericSchema;
  gt: (num: number|string, message?: Message<any>) => INumericSchema;
  lt: (num: number|string, message?: Message<any>) => INumericSchema;
  min: (num: number|string|Reference<number|string>, message?: Message<any>) => INumericSchema;
  max: (num: number|string|Reference<number|string>, message?: Message<any>) => INumericSchema;
  integer: (message?: Message<any>) => INumericSchema;
  moreThan: (more: number|string|Reference<number|string>, message?: Message<any>) => INumericSchema;
  lessThan: (more: number|string|Reference<number|string>, message?: Message<any>) => INumericSchema;
  required: (message?: Message<any>) => INumericSchema;
  optional: () => INumericSchema;
  nullable: (message?: Message<any>) => INumericSchema;
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

  gte(num: number|string|Reference<number|string>, message?: Message<any>): INumericSchema {
    return isGreaterThanOrEqual.call(this, num, message);
  }

  lte(num: number|string|Reference<number|string>, message?: Message<any>): INumericSchema {
    return isLessThanOrEqual.call(this, num, message);
  }

  min(num: number|string|Reference<number|string>, message?: Message<any>): INumericSchema {
    return isGreaterThanOrEqual.call(this, num, message);
  }

  max(num: number|string|Reference<number|string>, message?: Message<any>): INumericSchema {
    return isLessThanOrEqual.call(this, num, message);
  }

  eq(num: number|string|Reference<number|string>, message?: Message<any>): INumericSchema {
    return isEqual.call(this, num, message);
  }

  gt(num: number|string, message?: Message<any>): INumericSchema {
    return isGreaterThan.call(this, num, message);
  }

  lt(num: number|string, message?: Message<any>): INumericSchema {
    return isLessThan.call(this, num, message);
  }

  integer(message?: Message<any>): INumericSchema {
    return isInteger.call(this, message);
  }

  moreThan(more: number|string|Reference<number|string>, message?: Message<any>): INumericSchema {
    return isMoreThanWithRef.call(this, more, message);
  }

  lessThan(less: number|string|Reference<number|string>, message?: Message<any>): INumericSchema {
    return isLessThanWithRef.call(this, less, message);
  }

  required(msg?: Message<any>): INumericSchema {
    return this.required(msg);
  }

  notRequired(msg?: Message<any>): INumericSchema {
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

import { MixedSchema } from "yup";
import { isAbsent, isEqual, isGreaterThan, isGreaterThanOrEqual, isLessThan, isLessThanOrEqual } from "./utils";
import BigNumber from "bignumber.js";

export interface INumericSchema extends MixedSchema<string> {
  gte: (num: number|string, message?: string) => INumericSchema;
  lte: (num: number|string, message?: string) => INumericSchema;
  eq: (num: number|string, message?: string) => INumericSchema;
  gt: (num: number|string, message?: string) => INumericSchema;
  lt: (num: number|string, message?: string) => INumericSchema;
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

  gte(num: number|string, message?: string): INumericSchema {
    return isGreaterThanOrEqual.call(this, num, message);
  }

  lte(num: number|string, message?: string): INumericSchema {
    return isLessThanOrEqual.call(this, num, message);
  }

  eq(num: number|string, message?: string): INumericSchema {
    return isEqual.call(this, num, message);
  }

  gt(num: number|string, message?: string): INumericSchema {
    return isGreaterThan.call(this, num, message);
  }

  lt(num: number|string, message?: string): INumericSchema {
    return isLessThan.call(this, num, message);
  }
}

export const numeric = () => new NumericSchema();

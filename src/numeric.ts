import { Message, MixedSchema, Reference } from "yup";
import {
  isAbsent,
  isEqual,
  isGreaterThan,
  isGreaterThanOrEqual,
  isInteger,
  isLessThan,
  isLessThanOrEqual,
  isLessThanWithRef,
  isMoreThanWithRef,
} from "./utils";
import BigNumber from "bignumber.js";

export interface INumericSchema extends MixedSchema<string> {
  gte: (
    num: number | string | Reference<number | string>,
    message?: Message<any>
  ) => INumericSchema;
  lte: (
    num: number | string | Reference<number | string>,
    message?: Message<any>
  ) => INumericSchema;
  eq: (
    num: number | string | Reference<number | string>,
    message?: Message<any>
  ) => INumericSchema;
  gt: (num: number | string, message?: Message<any>) => INumericSchema;
  lt: (num: number | string, message?: Message<any>) => INumericSchema;
  min: (
    num: number | string | Reference<number | string>,
    message?: Message<any>
  ) => INumericSchema;
  max: (
    num: number | string | Reference<number | string>,
    message?: Message<any>
  ) => INumericSchema;
  integer: (message?: Message<any>) => INumericSchema;
  moreThan: (
    more: number | string | Reference<number | string>,
    message?: Message<any>
  ) => INumericSchema;
  lessThan: (
    more: number | string | Reference<number | string>,
    message?: Message<any>
  ) => INumericSchema;
  required: (message?: Message<any>) => INumericSchema;
  optional: () => INumericSchema;
  nullable: (message?: Message<any>) => INumericSchema;
  nonNullable: () => INumericSchema;
}

export class NumericSchema extends MixedSchema<string> {
  constructor() {
    super({
      type: "numeric",
      check(value: string): value is NonNullable<string> {
        const parsed = new BigNumber(value);
        return typeof value === "string" && !parsed.isNaN();
      },
    });

    this.withMutation((schema) => {
      schema.transform(function mutate(value) {
        if (isAbsent(value)) return value;
        return value.toString();
      });
    });
  }

  /**
   * Value must be greater than or equal to `num` (ie. value >= num),
   * where `num` can be a string, number or reference to another field.
   * For instance, `ref('field_name')`.
   */
  gte(
    num: number | string | Reference<number | string>,
    message?: Message<any>
  ): INumericSchema {
    return isGreaterThanOrEqual.call(this, num, message);
  }

  /**
   * Value must be less than or equal to `num` (ie. value <= num),
   * where `num` can be a string, number or reference to another field.
   * For instance, `ref('field_name')`.
   */
  lte(
    num: number | string | Reference<number | string>,
    message?: Message<any>
  ): INumericSchema {
    return isLessThanOrEqual.call(this, num, message);
  }

  /**
   * Set a minimum value for the string value (ie. value >= min),
   * where `min` can be a string, number or reference to another field.
   * For instance, `ref('field_name')`.
   */
  min(
    min: number | string | Reference<number | string>,
    message?: Message<any>
  ): INumericSchema {
    return isGreaterThanOrEqual.call(this, min, message);
  }

  /**
   * Set a maximum value for the string value (ie. value <= max),
   * where `max` can be a string, number or reference to another field.
   * For instance, `ref('field_name')`.
   */
  max(
    max: number | string | Reference<number | string>,
    message?: Message<any>
  ): INumericSchema {
    return isLessThanOrEqual.call(this, max, message);
  }

  /**
   * Value must be equal to the given number `num` (ie. value === num),
   * where `num` can be a string, number or reference to another field.
   * For instance, `ref('field_name')`.
   */
  eq(
    num: number | string | Reference<number | string>,
    message?: Message<any>
  ): INumericSchema {
    return isEqual.call(this, num, message);
  }

  /**
   * Value must be more than the given number `more` (ie. value > more),
   * where `more` can be a string, number or reference to another field.
   * For instance, `ref('field_name')`.
   */
  gt(more: number | string, message?: Message<any>): INumericSchema {
    return isGreaterThan.call(this, more, message);
  }

  /**
   * Value must be less than the given number `less` (ie. value < less),
   * where `less` can be a string, number or reference to another field.
   * For instance, `ref('field_name')`.
   */
  lt(less: number | string, message?: Message<any>): INumericSchema {
    return isLessThan.call(this, less, message);
  }

  /**
   * Value must be an integer.
   */
  integer(message?: Message<any>): INumericSchema {
    return isInteger.call(this, message);
  }

  /**
   * Value must be more than the given number `more` (ie. value > more),
   * where `more` can be a string, number or reference to another field.
   * For instance, `ref('field_name')`.
   */
  moreThan(
    more: number | string | Reference<number | string>,
    message?: Message<any>
  ): INumericSchema {
    return isMoreThanWithRef.call(this, more, message);
  }

  /**
   * Value must be less than the given number `less` (ie. value < less),
   * where `less` can be a string, number or reference to another field.
   * For instance, `ref('field_name')`.
   */
  lessThan(
    less: number | string | Reference<number | string>,
    message?: Message<any>
  ): INumericSchema {
    return isLessThanWithRef.call(this, less, message);
  }

  /**
   * Value is required.
   */
  required(msg?: Message<any>): INumericSchema {
    return super.required(msg) as INumericSchema;
  }

  /**
   * Value is not required.
   */
  notRequired(msg?: Message<any>): INumericSchema {
    return super.required(msg) as INumericSchema;
  }

  /**
   * Value is optional.
   */
  optional(): INumericSchema {
    return super.optional() as INumericSchema;
  }

  /**
   * Value cannot be null.
   */
  nonNullable(): INumericSchema {
    return super.nonNullable() as INumericSchema;
  }

  /**
   * Value can be null.
   */
  nullable(msg?: Message<any> | undefined): INumericSchema {
    return super.nullable(msg) as INumericSchema;
  }
}

/**
 * yup schema for numeric string. Schema is used to validate strings that only contain
 * numbers which can be float or integer.
 */
export const numeric = () => new NumericSchema();

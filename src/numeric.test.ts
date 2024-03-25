import { describe, expect, it } from "vitest";
import { ValidationError, object, ref } from "yup";
import { numeric } from './numeric'

const invalidMessage = 'Invalid numeric';

describe('numeric', () => {
  it('should resolve validation when given a valid value', async () => {
    const schema = numeric().typeError('Invalid numeric');
    const value = '1.0000000000000000000000000000000000001';
    const result = await schema.validate(value);

    expect(result).toBe(result);
  });

  it('should reject validation when given an alphabet-only string', async () => {
    const schema = numeric().typeError('Invalid numeric');
    const value = 'lol';
    const result = schema.validate(value);

    expect(result).rejects.toEqual(new ValidationError(invalidMessage));
  });

  it('should reject validation when given an alphanumeric string', async () => {
    const schema = numeric().typeError('Invalid numeric');
    const value = '1.123lol.123';
    const result = schema.validate(value);

    expect(result).rejects.toEqual(new ValidationError(invalidMessage));
  });

  it('should reject validation when given a dot value', async () => {
    const schema = numeric().typeError('Invalid numeric');
    const value = '.';
    const result = schema.validate(value);

    expect(result).rejects.toEqual(new ValidationError(invalidMessage));
  });

  it('should reject validation when given an empty string', async () => {
    const schema = numeric().typeError('Invalid numeric');
    const value = '';
    const result = schema.validate(value);

    expect(result).rejects.toEqual(new ValidationError(invalidMessage));
  });

  it('should reject validation when given null', async () => {
    const schema = numeric().typeError('Invalid numeric');
    const value = null;
    const result = schema.validate(value);

    expect(result).rejects.toEqual(new ValidationError('this cannot be null'));
  });

  it('should reject validation when given undefined', async () => {
    const schema = numeric().typeError('Invalid numeric');
    const value = undefined;
    const result = await schema.validate(value);

    expect(result).toBe(value);
  });

});

describe('gt', () => {
  it('should reject validation when given value equal to boundary', async () => {
    const schema = object({
      window: numeric().gt(5.3)
    });
    const value = { window: '5.3' };
    const result = schema.validate(value);

    expect(result).rejects.toEqual(new ValidationError('window must be greater than 5.3'));
  });

  it('should reject validation when given a smaller value', async () => {
    const schema = object({
      window: numeric().gt(5.3)
    });
    const value = { window: '4' };
    const result = schema.validate(value);

    expect(result).rejects.toEqual(new ValidationError('window must be greater than 5.3'));
  });

  it('should reject validation when given an invalid value', async () => {
    const schema = object({
      window: numeric().gt(5.3).typeError(invalidMessage)
    });
    const value = { window: 'sdfdf' };
    const result = schema.validate(value);

    expect(result).rejects.toEqual(new ValidationError(invalidMessage));
  });

  it('should reject validation when given null', async () => {
    const schema = object({
      window: numeric().gt(5.3)
    });
    const value = { window: null };
    const result = schema.validate(value);

    expect(result).rejects.toEqual(new ValidationError('window cannot be null'));
  });

  it('should resolves when given undefined', async () => {
    const schema = object({
      window: numeric().gt(5.3)
    });
    const value = { window: undefined };
    const result = schema.validate(value);

    expect(result).resolves.toEqual(value);
  });
});

describe('lt', () => {
  it('should reject validation when given value equal to boundary', async () => {
    const schema = object({
      window: numeric().lt(5.3)
    });
    const value = { window: '5.3' };
    const result = schema.validate(value);

    expect(result).rejects.toEqual(new ValidationError('window must be less than 5.3'));
  });

  it('should reject validation when given a greater value', async () => {
    const schema = object({
      window: numeric().lt(5.3)
    });
    const value = { window: '5.3000000000000001' };
    const result = schema.validate(value);

    expect(result).rejects.toEqual(new ValidationError('window must be less than 5.3'));
  });

  it('should reject validation when given an invalid value', async () => {
    const schema = object({
      window: numeric().lt(5.3).typeError(invalidMessage)
    });
    const value = { window: 'sdfdf' };
    const result = schema.validate(value);

    expect(result).rejects.toEqual(new ValidationError(invalidMessage));
  });

  it('should reject validation when given null', async () => {
    const schema = object({
      window: numeric().lt(5.3)
    });
    const value = { window: null };
    const result = schema.validate(value);

    expect(result).rejects.toEqual(new ValidationError('window cannot be null'));
  });

  it('should resolves when given undefined', async () => {
    const schema = object({
      window: numeric().lt(5.3)
    });
    const value = { window: undefined };
    const result = schema.validate(value);

    expect(result).resolves.toEqual(value);
  });
});

describe('gte', () => {
  it('should resolves validation when given value equal to boundary', async () => {
    const schema = object({
      window: numeric().gte(5.3)
    });
    const value = { window: '5.3' };
    const result = schema.validate(value);

    expect(result).resolves.toEqual(value);
  });

  it('should resolves validation when given a greater value', async () => {
    const schema = object({
      window: numeric().gte(5.3)
    });
    const value = { window: '5.3000000000000001' };
    const result = schema.validate(value);

    expect(result).resolves.toEqual(value);
  });

  it('should reject validation when given a smaller value', async () => {
    const schema = object({
      window: numeric().gte(5.3)
    });
    const value = { window: '5.2999999999999999999999' };
    const result = schema.validate(value);

    expect(result).rejects.toEqual(new ValidationError('window must be greater than or equal to 5.3'));
  });

  it('should reject validation when given an invalid value', async () => {
    const schema = object({
      window: numeric().gte(5.3).typeError(invalidMessage)
    });
    const value = { window: 'sdfdf' };
    const result = schema.validate(value);

    expect(result).rejects.toEqual(new ValidationError(invalidMessage));
  });

  it('should reject validation when given null', async () => {
    const schema = object({
      window: numeric().gte(5.3)
    });
    const value = { window: null };
    const result = schema.validate(value);

    expect(result).rejects.toEqual(new ValidationError('window cannot be null'));
  });

  it('should resolves when given undefined', async () => {
    const schema = object({
      window: numeric().gte(5.3)
    });
    const value = { window: undefined };
    const result = schema.validate(value);

    expect(result).resolves.toEqual(value);
  });

  it('should reject validation when less than ref', async () => {
    const schema = object({
      minWindow: numeric(),
      maxWindow: numeric().gte(ref('minWindow'))
    });
    const value = { minWindow: '3.2', maxWindow: '3.11' };
    const result = schema.validate(value);

    await expect(result).rejects.toEqual(new ValidationError('maxWindow must be greater than or equal to minWindow'));
  });

  it('should reject validation when ref is invalid number', async () => {
    const schema = object({
      minWindow: numeric(),
      maxWindow: numeric().gte(ref('minWindow'))
    });
    const value = { minWindow: 'abc', maxWindow: '3.11' };
    const result = schema.validate(value);

    await expect(result).rejects.toEqual(new ValidationError('maxWindow must be greater than or equal to minWindow'));
  });

  it('should resolves validation when greater than ref', async () => {
    const schema = object({
      minWindow: numeric(),
      maxWindow: numeric().gte(ref('minWindow'))
    });
    const value = { minWindow: '3.2', maxWindow: '3.2000000001' };
    const result = schema.validate(value);

    await expect(result).resolves.toEqual(value);
  });

  it('should resolves validation when equal to ref', async () => {
    const schema = object({
      minWindow: numeric(),
      maxWindow: numeric().gte(ref('minWindow'))
    });
    const value = { minWindow: '3.2', maxWindow: '3.2' };
    const result = schema.validate(value);

    await expect(result).resolves.toEqual(value);
  });
});

describe('lte', () => {
  it('should resolves validation when given value equal to boundary', async () => {
    const schema = object({
      window: numeric().lte(5.3)
    });
    const value = { window: '5.3' };
    const result = schema.validate(value);

    expect(result).resolves.toEqual(value);
  });

  it('should rejects validation when given a greater value', async () => {
    const schema = object({
      window: numeric().lte(5.3)
    });
    const value = { window: '5.3000000000000001' };
    const result = schema.validate(value);

    expect(result).rejects.toEqual(new ValidationError('window must be less than or equal to 5.3'));
  });

  it('should resolves validation when given a less value', async () => {
    const schema = object({
      window: numeric().lte(5.3)
    });
    const value = { window: '5.2999999999999999999999' };
    const result = schema.validate(value);

    expect(result).resolves.toEqual(value);
  });

  it('should reject validation when given an invalid value', async () => {
    const schema = object({
      window: numeric().lte(5.3).typeError(invalidMessage)
    });
    const value = { window: 'sdfdf' };
    const result = schema.validate(value);

    expect(result).rejects.toEqual(new ValidationError(invalidMessage));
  });

  it('should reject validation when given null', async () => {
    const schema = object({
      window: numeric().lte(5.3)
    });
    const value = { window: null };
    const result = schema.validate(value);

    expect(result).rejects.toEqual(new ValidationError('window cannot be null'));
  });

  it('should resolves when given undefined', async () => {
    const schema = object({
      window: numeric().lte(5.3)
    });
    const value = { window: undefined };
    const result = schema.validate(value);

    expect(result).resolves.toEqual(value);
  });

  it('should reject validation when greater than ref', async () => {
    const schema = object({
      minWindow: numeric().lte(ref('maxWindow')),
      maxWindow: numeric()
    });
    const value = { minWindow: '3.2', maxWindow: '3.11' };
    const result = schema.validate(value);

    await expect(result).rejects.toEqual(new ValidationError('minWindow must be less than or equal to maxWindow'));
  });

  it('should reject validation when ref is invalid number', async () => {
    const schema = object({
      minWindow: numeric().lte(ref('maxWindow')),
      maxWindow: numeric()
    });
    const value = { minWindow: '3.2', maxWindow: 'abc' };
    const result = schema.validate(value);

    await expect(result).rejects.toEqual(new ValidationError('maxWindow must be a `numeric` type, but the final value was: `"abc"`.'));
  });

  it('should resolves validation when less than ref', async () => {
    const schema = object({
      minWindow: numeric().lte(ref('maxWindow')),
      maxWindow: numeric()
    });
    const value = { minWindow: '3.2', maxWindow: '3.2000000001' };
    const result = schema.validate(value);

    await expect(result).resolves.toEqual(value);
  });

  it('should resolves validation when equal to ref', async () => {
    const schema = object({
      minWindow: numeric().lte(ref('maxWindow')),
      maxWindow: numeric()
    });
    const value = { minWindow: '3.2', maxWindow: '3.2' };
    const result = schema.validate(value);

    await expect(result).resolves.toEqual(value);
  });
});

describe('eq', () => {
  it('should resolves validation when given value equal to boundary', async () => {
    const schema = object({
      window: numeric().eq(5.3)
    });
    const value = { window: '5.3' };
    const result = schema.validate(value);

    expect(result).resolves.toEqual(value);
  });

  it('should rejects validation when given a greater value', async () => {
    const schema = object({
      window: numeric().eq(5.3)
    });
    const value = { window: '5.3000000000000001' };
    const result = schema.validate(value);

    expect(result).rejects.toEqual(new ValidationError('window must be equal to 5.3'));
  });

  it('should rejects validation when given a smaller value', async () => {
    const schema = object({
      window: numeric().eq(5.3)
    });
    const value = { window: '5.2999999999999999999999' };
    const result = schema.validate(value);

    expect(result).rejects.toEqual(new ValidationError('window must be equal to 5.3'));
  });

  it('should reject validation when given an invalid value', async () => {
    const schema = object({
      window: numeric().eq(5.3).typeError(invalidMessage)
    });
    const value = { window: 'sdfdf' };
    const result = schema.validate(value);

    expect(result).rejects.toEqual(new ValidationError(invalidMessage));
  });

  it('should reject validation when given null', async () => {
    const schema = object({
      window: numeric().eq(5.3)
    });
    const value = { window: null };
    const result = schema.validate(value);

    expect(result).rejects.toEqual(new ValidationError('window cannot be null'));
  });

  it('should resolves when given undefined', async () => {
    const schema = object({
      window: numeric().eq(5.3)
    });
    const value = { window: undefined };
    const result = schema.validate(value);

    expect(result).resolves.toEqual(value);
  });

  it('should reject validation when greater than ref', async () => {
    const schema = object({
      minWindow: numeric().eq(ref('maxWindow')),
      maxWindow: numeric()
    });
    const value = { minWindow: '3.2', maxWindow: '3.3' };
    const result = schema.validate(value);

    await expect(result).rejects.toEqual(new ValidationError('minWindow must be equal to maxWindow'));
  });

  it('should reject validation when less than ref', async () => {
    const schema = object({
      minWindow: numeric().eq(ref('maxWindow')),
      maxWindow: numeric()
    });
    const value = { minWindow: '3.2', maxWindow: '3.11' };
    const result = schema.validate(value);

    await expect(result).rejects.toEqual(new ValidationError('minWindow must be equal to maxWindow'));
  });

  it('should reject validation when ref is invalid number', async () => {
    const schema = object({
      minWindow: numeric().eq(ref('maxWindow')),
      maxWindow: numeric()
    });
    const value = { minWindow: '3.2', maxWindow: 'abc' };
    const result = schema.validate(value);

    await expect(result).rejects.toEqual(new ValidationError('maxWindow must be a `numeric` type, but the final value was: `"abc"`.'));
  });

  it('should resolves validation when equal to ref', async () => {
    const schema = object({
      minWindow: numeric().eq(ref('maxWindow')),
      maxWindow: numeric()
    });
    const value = { minWindow: '3.2', maxWindow: '3.2' };
    const result = schema.validate(value);

    await expect(result).resolves.toEqual(value);
  });
});

describe('min', () => {
  it('should resolves validation when given value equal to boundary', async () => {
    const schema = object({
      window: numeric().min(5.3)
    });
    const value = { window: '5.3' };
    const result = schema.validate(value);

    expect(result).resolves.toEqual(value);
  });

  it('should resolves validation when given a greater value', async () => {
    const schema = object({
      window: numeric().min(5.3)
    });
    const value = { window: '5.3000000000000001' };
    const result = schema.validate(value);

    expect(result).resolves.toEqual(value);
  });

  it('should reject validation when given a smaller value', async () => {
    const schema = object({
      window: numeric().min(5.3)
    });
    const value = { window: '5.2999999999999999999999' };
    const result = schema.validate(value);

    expect(result).rejects.toEqual(new ValidationError('window must be greater than or equal to 5.3'));
  });

  it('should reject validation when given an invalid value', async () => {
    const schema = object({
      window: numeric().min(5.3).typeError(invalidMessage)
    });
    const value = { window: 'sdfdf' };
    const result = schema.validate(value);

    expect(result).rejects.toEqual(new ValidationError(invalidMessage));
  });

  it('should reject validation when given null', async () => {
    const schema = object({
      window: numeric().min(5.3)
    });
    const value = { window: null };
    const result = schema.validate(value);

    expect(result).rejects.toEqual(new ValidationError('window cannot be null'));
  });

  it('should resolves when given undefined', async () => {
    const schema = object({
      window: numeric().min(5.3)
    });
    const value = { window: undefined };
    const result = schema.validate(value);

    expect(result).resolves.toEqual(value);
  });
});

describe('max', () => {
  it('should resolves validation when given value equal to boundary', async () => {
    const schema = object({
      window: numeric().max(5.3)
    });
    const value = { window: '5.3' };
    const result = schema.validate(value);

    expect(result).resolves.toEqual(value);
  });

  it('should rejects validation when given a greater value', async () => {
    const schema = object({
      window: numeric().max(5.3)
    });
    const value = { window: '5.3000000000000001' };
    const result = schema.validate(value);

    expect(result).rejects.toEqual(new ValidationError('window must be less than or equal to 5.3'));
  });

  it('should resolves validation when given a smaller value', async () => {
    const schema = object({
      window: numeric().max(5.3)
    });
    const value = { window: '5.2999999999999999999999' };
    const result = schema.validate(value);

    expect(result).resolves.toEqual(value);
  });

  it('should reject validation when given an invalid value', async () => {
    const schema = object({
      window: numeric().max(5.3).typeError(invalidMessage)
    });
    const value = { window: 'sdfdf' };
    const result = schema.validate(value);

    expect(result).rejects.toEqual(new ValidationError(invalidMessage));
  });

  it('should reject validation when given null', async () => {
    const schema = object({
      window: numeric().max(5.3)
    });
    const value = { window: null };
    const result = schema.validate(value);

    expect(result).rejects.toEqual(new ValidationError('window cannot be null'));
  });

  it('should resolves when given undefined', async () => {
    const schema = object({
      window: numeric().max(5.3)
    });
    const value = { window: undefined };
    const result = schema.validate(value);

    expect(result).resolves.toEqual(value);
  });

  it('should rejects when given value is greater than max but smaller than lte', async () => {
    const schema = object({
      window: numeric().max(5.3).lte(9)
    });
    const value = { window: '8' };
    const result = schema.validate(value);

    expect(result).rejects.toEqual(new ValidationError('window must be less than or equal to 5.3'));
  });

  it('should rejects when given value is smaller than both max & lte', async () => {
    const schema = object({
      window: numeric().max(5.3).lte(9)
    });
    const value = { window: '4' };
    const result = schema.validate(value);

    expect(result).resolves.toEqual(value);
  });
});

describe('integer', () => {
  it('should resolve validation when given an integer', async () => {
    const schema = object({
      window: numeric().integer()
    });
    const value = { window: '500390393093030330303030' };
    const result = schema.validate(value);

    expect(result).resolves.toEqual(value);
  });

  it('should resolve validation when given a negative integer', async () => {
    const schema = object({
      window: numeric().integer()
    });
    const value = { window: '-500390393093030330303030' };
    const result = schema.validate(value);

    expect(result).resolves.toEqual(value);
  });

  it('should resolve validation when given an integer with min boundary', async () => {
    const schema = object({
      window: numeric().integer().min(4)
    });
    const value = { window: '4.0' };
    const result = schema.validate(value);

    expect(result).resolves.toEqual(value);
  });

  it('should reject validation when given a non-integer', async () => {
    const schema = object({
      window: numeric().integer()
    });
    const value = { window: '5.3000000000000001' };
    const result = schema.validate(value);

    expect(result).rejects.toEqual(new ValidationError('window must be an integer'));
  });

  it('should resolve validation when given 0', async () => {
    const schema = object({
      window: numeric().integer()
    });
    const value = { window: '0' };
    const result = schema.validate(value);

    expect(result).resolves.toEqual(value);
  });

  it('should resolve validation when given 0.00', async () => {
    const schema = object({
      window: numeric().integer()
    });
    const value = { window: '0.00' };
    const result = schema.validate(value);

    expect(result).resolves.toEqual(value);
  });
});

describe('isMoreThan', () => {
  it('should resolve validation when given a greater value', async () => {
    const schema = object({
      window: numeric().moreThan(3)
    });
    const value = { window: '4' };
    const result = schema.validate(value);

    await expect(result).resolves.toEqual(value);
  });

  it('should reject validation when given a smaller value', async () => {
    const schema = object({
      window: numeric().moreThan(3)
    });
    const value = { window: '2.9999999' };
    const result = schema.validate(value);

    await expect(result).rejects.toEqual(new ValidationError('window must be more than 3'));
  });

  it('should reject validation when smaller than ref', async () => {
    const schema = object({
      minWindow: numeric(),
      maxWindow: numeric().moreThan(ref('minWindow'))
    });
    const value = { minWindow: '3.2', maxWindow: '3.11' };
    const result = schema.validate(value);

    await expect(result).rejects.toEqual(new ValidationError('maxWindow must be more than minWindow'));
  });

  it('should resolve validation when more than ref', async () => {
    const schema = object({
      minWindow: numeric(),
      maxWindow: numeric().moreThan(ref('minWindow'))
    });
    const value = { minWindow: '3.2', maxWindow: '3.5' };
    const result = schema.validate(value);

    await expect(result).resolves.toEqual(value);
  });
});

describe('isLessThan', () => {
  it('should resolve validation when given a smaller value', async () => {
    const schema = object({
      window: numeric().lessThan(3)
    });
    const value = { window: '2.999999999999999999999999' };
    const result = schema.validate(value);

    await expect(result).resolves.toEqual(value);
  });

  it('should reject validation when given a greater value', async () => {
    const schema = object({
      window: numeric().lessThan(3)
    });
    const value = { window: '3.0000000000000001' };
    const result = schema.validate(value);

    await expect(result).rejects.toEqual(new ValidationError('window must be less than 3'));
  });

  it('should reject validation when smaller than ref', async () => {
    const schema = object({
      maxWindow: numeric(),
      minWindow: numeric().lessThan(ref('maxWindow'))
    });
    const value = { minWindow: '3.2', maxWindow: '3.11' };
    const result = schema.validate(value);

    await expect(result).rejects.toEqual(new ValidationError('minWindow must be less than maxWindow'));
  });

  it('should resolve validation when more than ref', async () => {
    const schema = object({
      maxWindow: numeric(),
      minWindow: numeric().lessThan(ref('maxWindow'))
    });
    const value = { minWindow: '3.2', maxWindow: '3.5' };
    const result = schema.validate(value);

    await expect(result).resolves.toEqual(value);
  });
});

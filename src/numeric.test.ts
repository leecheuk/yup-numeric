import { describe, expect, it } from "vitest";
import { ValidationError, object } from "yup";
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

  it('should resolves validation when given a smaller value', async () => {
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
});
